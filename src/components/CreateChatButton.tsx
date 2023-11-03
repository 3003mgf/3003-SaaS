'use client'

import { MessageSquarePlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useSubscriptionStore } from "@/store/store";
import { useToast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from "uuid";
import { getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import { addChatRef, chatMembersCollectionGroupRef } from "@/lib/converters/ChatMembers";
import { authOptions } from "@base/auth";
import { ToastAction } from "./ui/toast";


const CreateChatButton = ({isLarge}:{isLarge?: boolean}) => {

  const {data: session} = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const subscription = useSubscriptionStore(state => state.subscription);
  const isPro = subscription?.status === "active";

  const createNewChat = async() =>{
    
    if(!session?.user.id || loading) return;

    setLoading(true);
    toast({
      title:"Creating new chat...",
      description: "Hold tight while we create your new chat...",
      duration: 3000
    });

    // TODO: Check if user is PRO and limit the number of chats
    
    const chatsLength = (await getDocs(chatMembersCollectionGroupRef(session.user.id))).docs.map(doc => doc.data()).length;

    if(!isPro && chatsLength > 3){
      toast({
        title: "Free plan limit exceeded",
        description:"You've exceeded the limit of chats for the FREE plan. Please upgrade to PRO to continue adding users to chats!",
        variant: "destructive",
        action: (
          <ToastAction
            altText="Upgrade"
            onClick={()=> router.push("/register")}
          >
            Upgrade to PRO
          </ToastAction>
        )
      });

      return;
    }
    
    
    const chatId = uuidv4();

    await setDoc(addChatRef(chatId, session.user.id), {
      userId: session.user.id!,
      email: session.user.email!,
      timestamp: serverTimestamp(),
      isAdmin: true,
      chatId: chatId,
      image: session.user.image || ""
    }).then(()=> {
      toast({
        title: "Success",
        description: "Your chat has been created!",
        className: "bg-green-600 text-white",
        duration: 2000
      })
      router.push(`/chat/${chatId}`)
    }).catch(error => {
      toast({
        title: "Error",
        description: "There was an error creating your chat!",
        variant:"destructive"
      })
    }).finally(()=>{
      setLoading(false);
    })

  };

  return ( 
    <Button variant={"ghost"} onClick={createNewChat}>
      <MessageSquarePlusIcon className="h-5 w-5"/>
    </Button>
   );
}
 
export default CreateChatButton;