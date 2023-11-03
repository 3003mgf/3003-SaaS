"use client"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod"
import { Button } from "./ui/button"
import { BotIcon, MessageCircleIcon, PaperclipIcon, SendHorizonal } from "lucide-react"
import { useEffect, useState } from "react"
import { User, limitedMessagesRef, messagesRef } from "@/lib/converters/Messages"
import { addDoc, getDocs, serverTimestamp } from "firebase/firestore"
import { usePathname, useRouter } from "next/navigation"
import { Separator } from "@radix-ui/react-dropdown-menu"
import { useSubscriptionStore } from "@/store/store"
import { toast } from "./ui/use-toast"
import { ToastAction } from "./ui/toast"

const formSchema = z.object({
  input: z.string().max(1000),
})


const ChatInput = ({chatId}:{chatId:string}) => {

  const {data: session} = useSession();
  const subscription = useSubscriptionStore(state => state.subscription);
  const router = useRouter();

  const [sendingMessage, setSendingMessage] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState("");


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: ""
    }
  })
  

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if(sendingMessage){
      return;
    }
    if(values.input.length === 0){
      return;
    };
    if(!session?.user){
      return;
    };
    if(!chatId){
      return;
    }

    setSendingMessage(true);

    // TODO: If user is not PRO, limit the messages quantity.

    const messagesSent = (await getDocs(limitedMessagesRef(chatId))).docs.map(doc => doc.data()).length;
    const isPro = subscription?.status === "active";

    if(!isPro && messagesSent >= 20){
      setSendingMessage(false);
      return toast({
        title: "Free plan limit exceeded",
        description:"You've exceeded the FREE plan limit of 20 messages per chat. Upgrade to PRO for unlimited chat messages!",
        variant: "destructive",
        action: (
          <ToastAction
            altText="Upgrade"
            onClick={()=> router.push("/register")}
          >
            Upgrade to PRO
          </ToastAction>
        )
      })
    };
    
    const userToStore: User = {
      id: session.user.id!,
      name: session.user.name!,
      email: session.user.email!,
      image: session.user.image! || ""
    };

    addDoc(messagesRef(chatId), {
      input: values.input,
      timestamp: serverTimestamp(),
      user: userToStore
    }).catch(error =>{
      toast({
        title:"Error",
        description:"You can't send messages because you are not part of this chat. Ask the Admin to add you!",
        variant:"destructive"
      })
    })

    setSendingMessage(false);
    form.reset()

  }

  const askSuggestion = async() =>{
    if(!session?.user.name) return;
    setAiLoading(true);

    fetch("https://3003saas.vercel.app/api/askAI", {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({user: session.user.name})
    })
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(json => setAiSuggestion(json.suggestion))
    .catch(error => console.log(error))
    .finally(()=>{
      setAiLoading(false);
    })
  };

  const useSuggestion = () =>{
    if(!aiLoading) form.setValue("input", aiSuggestion);
  };

 
  return (
    <div className="fixed w-full bottom-0 left-1/2 -translate-x-1/2">
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)} 
          className="flex space-x-2 p-2 rounded-t-xl mx-auto bg-white border dark:bg-slate-800"
        >
          <FormField
            control={form.control}
            name="input"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input 
                    className="border-none font-LVRegular tracking-wide bg-transparent dark:placeholder:text-white/70"
                    placeholder="Enter message in ANY language..." 
                    {...field} 
                  />
                </FormControl>

                <FormDescription className={`text-xs tracking-wide ${aiSuggestion.length && "italic"} font-light border-t-[0.8px] border-gray-400/60 pt-3 px-3`}>
                  {aiSuggestion.length 
                  ? <><span className="font-semibold not-italic text-pink-600">AI: </span>{`"${aiSuggestion.trim()}"`}</> 
                  : <span className="font-LVRegular text-sm tracking-wide">{"Don't know what to say? Ask AI!"}</span>}
                  <span className="flex items-center mt-3 space-x-3">
                    <span>
                      {aiLoading ? (
                        <span className="h-5 w-5 animate-pulse">…</span>
                      ):(
                        <BotIcon className="h-5 w-5 cursor-pointer hover:opacity-70" onClick={askSuggestion}/>
                      )}
                    </span>
                    <span>
                      <MessageCircleIcon className={`h-5 w-5 ${(aiLoading || !aiSuggestion) ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:opacity-70"}`} onClick={useSuggestion}/>
                    </span>

                  </span>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-start space-x-2">
            <Button type="submit" className="bg-violet-600 text-white">
              <SendHorizonal className="h-5 w-5"/>
            </Button>
          </div>
        </form>
      </Form>
    </div>
   );
}
 
export default ChatInput;