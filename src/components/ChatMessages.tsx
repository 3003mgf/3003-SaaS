'use client'

import { Message, sortedMessagesRef } from "@/lib/converters/Messages";
import { useLanguageStore } from "@/store/store";
import { BotIcon, MessageCircleIcon } from "lucide-react";
import { Session } from "next-auth";
import { createRef, useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import LoadingSpinner from "./LoadingSpinner";
import UserAvatar from "./UserAvatar";

type Props = {
  chatId: string;
  session: Session | null;
  initialMessages: Message[];
}

const ChatMessages = ({chatId, session, initialMessages}:Props) => {
  
  const language = useLanguageStore(state => state.language);
  const messagesEndRef = createRef<HTMLDivElement>();

  const [messages, loading, error] = useCollectionData<Message>(
    sortedMessagesRef(chatId),
    {
      initialValue: initialMessages
    }
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({behavior: "smooth"})  

  }, [messages, messagesEndRef]);
  
  return ( 
    <div className="p-5">
      {!loading && messages?.length === 0 && (
        <div className="flex flex-col justify-center text-center items-center p-20 rounded-xl space-y-2 bg-gradient-to-br from-transparent via-pink-700 to-pink-800 dark:from-transparent dark:via-gray-800 dark:to-gray-950 text-white font-extralight">
          <MessageCircleIcon className="h-10 w-10"/>

          <h2>
            <span className="font-LVRegular">Invite a friend </span>&{" "}
            <span className="font-LVRegular">
              Send your first message in ANY language
            </span>{" "}
            <span className="font-LVWeb">below to get started!</span>
          </h2>

          <p className="font-LVWeb flex items-center">{"AI will auto-detect & translate it for you"}<BotIcon className="h-5 w-5 ml-1 text-white/80"/></p>
        </div>
      )}
      {messages?.map(message => {
        const isSender = message.user.id === session?.user.id;

        return (
          <div key={message.id} className="flex my-2 items-end">
            <div className={`flex flex-col relative space-y-2 p-4 w-fit line-clamp-1 mx-2 rounded-lg
            ${isSender
              ? "ml-auto bg-white ring-1 ring-gray-300/40 dark:ring-0 dark:bg-slate-950/30 rounded-br-none"
              : "bg-gray-100 dark:text-gray-100 dark:bg-slate-700 rounded-bl-none"}`}
            >

              {/* UserName */}
              <p className={`text-xs font-semibold line-clamp-1 ${isSender ? "text-right" : "text-left"}`}>
                {message.user.name.split(" ")[0]}
              </p>

              {/* Message */}
              <div className="flex space-x-3">
                <p className="font-LVWeb text-sm lg:text-base tracking-wide">{message.translated?.[language] || message.input}</p>
                {!message.translated && <LoadingSpinner height="15" width="15"/>}
              </div>
            </div>

            {/* Avatar */}
            <UserAvatar
              name={message.user.name}
              image={message.user.image}
              className={`${!isSender && "-order-1"} h-6 w-6`}
            />
          </div>
        )
      })}
      <div ref={messagesEndRef}></div>
    </div>
   );
}
 
export default ChatMessages;