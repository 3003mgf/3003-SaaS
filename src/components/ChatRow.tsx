'use client'

import { Skeleton } from "@/components/ui/skeleton"
import { Message, limitedSortedMessagesRef } from "@/lib/converters/Messages";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { cn } from "@/lib/utils";
import UserAvatar from "./UserAvatar";
import { useLanguageStore } from "@/store/store";

const ChatRow = ({chatId}:{chatId: string}) => {
  
  const {data: session} = useSession(); 
  const router = useRouter();
  const language = useLanguageStore(state => state.language);

  const [messages, loading, error] = useCollectionData<Message>(
    limitedSortedMessagesRef(chatId)
  );

  

  const prettyUUID = (n = 4) => chatId.substring(0, n);

  const row = (message?: Message) => {
    
    

    return (
      <div
        key={chatId}
        onClick={()=> router.push(`/chat/${chatId}`)}
        className="flex p-5 items-center space-x-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700"
      >
        <UserAvatar
          name={message?.user.name || session?.user.name!}
          image={message?.user.image || session?.user.image!}
        />

        {/* UserName && Last message*/}
        <div className="flex-1">
          <p className="font-bold">
            {!message && "New Chat"}
            
            {message && 
              [message?.user.name || session?.user.name].toString().split(" ")[0]
            }
          </p>

          <p className="text-gray-400 line-clamp-1 font-LVRegular">
            {message?.translated?.[language] || "Get the conversation started..."}
          </p>
        </div>
        
        {/* Timestamp */}
        <div className="text-xs text-gray-400 text-right space-y-2">
          <p className="mb-auto font-LVRegular">
            {message?.timestamp
            ? new Date(message.timestamp).toLocaleTimeString()
            : "No messages yet"}
          </p>
          <p className="font-LVRegular">Chat #{prettyUUID()}</p>
        </div>

      </div>
    )
  };

  return ( 
    <div>
      {loading && (
        <div className="flex items-center space-x-2 p-5">
          <Skeleton className="w-[50px] h-[50px] rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      )}

      {messages?.length === 0 && !loading && row()}

      {messages?.length! > 0 && !loading && messages?.map(message => row(message))}

    </div>
   );
} 
 
export default ChatRow;