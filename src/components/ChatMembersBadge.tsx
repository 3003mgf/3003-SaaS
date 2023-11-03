'use client'

import useIsAdmin from "@/hooks/useIsAdmin";
import { ChatMembers, chatMembersRef } from "@/lib/converters/ChatMembers";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { TailSpin } from "react-loader-spinner";
import { Badge } from "@/components/ui/badge"
import UserAvatar from "./UserAvatar";


const ChatMembersBadge = ({chatId}:{chatId:string}) => {

  const [members, loading, error] = useCollectionData<ChatMembers>(chatMembersRef(chatId));
  const adminId = useIsAdmin({chatId});
    
  if(loading && !members){
    return(
      <div className="flex items-center space-x-3 w-full justify-center py-7">
        <p className="font-LVRegular animate-pulse text-xs tracking-wide lg:text-sm dark:text-white text-gray-400">Getting chat members...</p>
        <TailSpin
          height="17"
          width="17"
          color="#f5f5f5"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    )
  }

  return ( 
    !loading && (
      <div className="p-2 border rounded-xl m-5">
        <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 p-2">
            {members?.map(member => (
              <Badge
                variant="secondary"
                key={member.userId}
                className="h-14 p-5 pl-2 pr-5 flex space-x-2 ring-1 ring-gray-400/30 dark:ring-0"
              >
                {/* Avatar */}
                <div className="flex items-center space-x-2">
                  <UserAvatar
                    name={member.email}
                    image={member.image}
                  />
                </div>

                {/* Role */}
                <div className="flex flex-col space-y-1.5">
                  <p className="text-xs tracking-wider lg:text-sm dark:text-white text-[#1f1f1f]">{member.email}</p>
                  {member.userId === adminId && (
                    <p className="text-pink-700 font-LVRegular dark:text-gray-400 animate-pulse">Chat Creator</p>
                  )}
                </div>
              </Badge>
            ))}
        </div>
      </div>

    )
   );
}
 
export default ChatMembersBadge;