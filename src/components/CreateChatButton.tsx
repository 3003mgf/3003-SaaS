'use client'

import { MessageSquarePlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useSubscriptionStore } from "@/store/store";
import { useToast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from "uuid";


const CreateChatButton = ({isLarge}:{isLarge?: boolean}) => {

  const {data: session} = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const subscription = useSubscriptionStore(state => state.subscription);


  const createNewChat = async() =>{
    if(!session?.user.id || loading) return;

    setLoading(true);
    toast({
      title:"Creating new chat...",
      description: "Hold tight while we create your new chat...",
      duration: 3000
    });

    // TODO: Check if user is PRO and limit the number of chats
    const chatId = uuidv4();

    router.push(`/chat/${chatId}`)
  };

  return ( 
    <Button variant={"ghost"} onClick={createNewChat}>
      <MessageSquarePlusIcon className="h-5 w-5"/>
    </Button>
   );
}
 
export default CreateChatButton;