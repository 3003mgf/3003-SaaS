'use client'

import { ChatMembers, chatMembersCollectionGroupRef } from "@/lib/converters/ChatMembers";
import { useSession } from "next-auth/react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import CreateChatButton from "./CreateChatButton";
import { MessageSquare } from "lucide-react";
import ChatRow from "./ChatRow";

type Props = {
  initialChats: ChatMembers[]
}

const ChatListRows = ({ initialChats }:Props) => {

  const {data: session} = useSession();
  
  const [members, loading, error] = useCollectionData<ChatMembers>(
    session && chatMembersCollectionGroupRef(session?.user.id!), 
    {
      initialValue: initialChats
    }
  );

  

  if(members?.length === 0){
    return (
      <div className="flex flex-col justify-center items-center pt-40 space-y-2">
        <MessageSquare className="h-10 w-10"/>
        <h1 className="text-5xl font-semibold">Welcome!</h1>
        <h2 className="pb-10 font-LVRegular">
          {"Let's get you started by creating your first chat!"}
        </h2>
        <CreateChatButton isLarge/>
      </div>
    )
  };

  return (
    <div>
      {members?.map((member, index) => (
        <ChatRow key={index} chatId={member.chatId}/>
      ))}
    </div>
  )

}
 
export default ChatListRows;