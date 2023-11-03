'use client'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import useIsAdmin from "@/hooks/useIsAdmin";
import { useSubscriptionStore } from "@/store/store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import * as z from "zod"
import { useToast } from "./ui/use-toast";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { PlusCircleIcon } from "lucide-react";
import { Input } from "./ui/input";
import { addDoc, getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import { addChatRef, chatMembersRef } from "@/lib/converters/ChatMembers";
import { ToastAction } from "./ui/toast";
import { getUserByEmail } from "@/lib/converters/User";
import ShareLink from "./ShareLink";



const InviteUser = ({chatId}:{chatId:string}) => {
  
  const formSchema = z.object({
    email: z.string().email("Please enter a valid email address")
  });

  const {data: session} = useSession();
  const subscription = useSubscriptionStore(state => state.subscription);
  const isPro = subscription?.status === 'active';
  const adminId = useIsAdmin({chatId});
  const router = useRouter();
  const { toast } = useToast();

  const [sending, setSending] = useState(false);
  const [open, setOpen] = useState(false);
  const [openInviteLink, setOpenInviteLink] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if(!session?.user.id) return;
    if(sending) return;

    setSending(true);

    toast({
      title: "Sending invite",
      description: "Please wait while we send the invite..."
    });

    const membersInChat = (await getDocs(chatMembersRef(chatId))).docs.map(doc => doc.data());
    const membersLength = membersInChat.length;
    const isAlreadyInChat = membersInChat.find(member => member.email === values.email);

    console.log(isAlreadyInChat);
    
    

    if(!isPro && membersLength > 3){
      setSending(false);
      return toast({
        title: "Free plan limit exceeded",
        description:"You've exceeded the limit of users in a single chat for the FREE plan. Please upgrade to PRO to continue adding users to the chat!",
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

    const findUserByEmail = await getDocs(getUserByEmail(values.email));
    if(findUserByEmail.empty){
      setSending(false);
      return toast({
        title:"User not found",
        description: "Please enter a valid email address of a registered user OR resend the invitation once they have signed up!",
        variant: "destructive"
      })
    }else{
      if(session.user.email === values.email){
        setSending(false);
        toast({
          title:"Error",
          description: "You can't send an invitation to yourself!",
          variant: "destructive"
        })

        return;
      };

      if(isAlreadyInChat){
        setSending(false);
        toast({
          title:"Error",
          description: "Whoops... the user you are trying to invite is already in the chat!",
          variant: "destructive"
        })
        return;
      }
      
      const user = findUserByEmail.docs[0].data();
      await setDoc(addChatRef(chatId, user.id), {
        userId: user.id!,
        email: user.email!,
        timestamp: serverTimestamp(),
        isAdmin: false,
        chatId: chatId,
        image: user.image || ""
      }).then(()=> {
        setOpen(false);
        setSending(false);

        toast({
          title:"Added to chat",
          description: "The user has been added to the chat succesfully!",
          duration: 3000,
          className:"bg-green-600 text-white"
        });

        setOpenInviteLink(true);
      })
      .catch(() => {
        setSending(false);
        toast({
          title:"Error",
          description: "Whoops... there was an error adding the user to the chat!",
          variant: "destructive"
        });

        setOpen(false);   
      })
    };
    
    if(sending) setSending(false);
    form.reset();

  };

  if(session?.user.id !== adminId) return null;

  return ( 
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"secondary"} className="font-LVRegular">
            <PlusCircleIcon className="mr-1 h-4 w-4"/>
            Add User To Chat
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md text-center">
          <DialogHeader>
            <DialogTitle className="text-center">Add User to Chat</DialogTitle>
            <DialogDescription className="font-LVRegular text-base">
              Simply enter another users email address to invite them to this chat!{" "}
              <span className="text-pink-700 text-sm font-LVRegular">
                (Note: they must be registered)
              </span>
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col space-y-3"
            >
              <FormField
                control={form.control}
                name="email"
                render={({field}) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="3003@saas.com" {...field}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button variant={"secondary"} className="ml-auto min-w-[114.95px] sm:w-fit w-full text-sm" type="submit">
                {sending ? <span className="animate-pulse">…</span> : "Add To Chat"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <ShareLink
        isOpen={openInviteLink}
        setIsOpen={setOpenInviteLink}
        chatId={chatId}
      />
    </>
   );
}
 
export default InviteUser;