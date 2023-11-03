'use client'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { cn } from "@/lib/utils";


const UserAvatar = ({name, image, className}:{name: string, image: string, className?: string}) => {
  return ( 
    <Avatar
      className={`${cn("dark:bg-white dark:text-[#1f1f1f] bg-gray-950 text-white", className)}`}>
      {/* If Firebase error, referrerPolicy='no-referrer' */}
      <AvatarImage src={image} alt="Profile Picture" />
      <AvatarFallback 
        delayMs={1000} 
        className="dark:bg-white dark:text-[#1f1f1f] bg-gray-900 text-white"
      >
        {name?.split(" ")
          .map((n, i)=> n[0])
          .join("")
          .slice(0, 2)
        }
      </AvatarFallback>
    </Avatar>
   );
}
 
export default UserAvatar;