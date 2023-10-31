'use client'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Session } from "next-auth"
import { signIn, signOut } from "next-auth/react"
import { Button } from "./ui/button"
import { useSubscriptionStore } from "@/store/store"
import LoadingSpinner from "./LoadingSpinner"
import { StarIcon } from "lucide-react"
import ManageBillingButton from "./ManageBillingButton"

type Props = {
  name?: string,
  image?: string,
  className?: string,
  session?: Session | null
}

export function UserButton({name, image, className, session}:Props) {
  
  const subscription = useSubscriptionStore(state => state.subscription);

  if(!session) return (
    <Button variant={"outline"} onClick={()=> signIn()}>
      Sign In
    </Button>
  )
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Avatar className={cn("dark:bg-white dark:text-[#1f1f1f] bg-gray-950 text-white", className)}>
          {/* If Firebase error, referrerPolicy='no-referrer' */}
          <AvatarImage src={image} alt="Profile Picture" />
          <AvatarFallback 
            delayMs={1000} 
            className="dark:bg-white dark:text-[#1f1f1f] bg-gray-900 text-white"
          >
            {name
              ?.split(" ")
              .map((n, i)=> n[0])
              .join("")
              .slice(0, 2)
            }
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="mb-1 text-xs">{session?.user?.name?.length! > 25 ? session?.user?.name?.slice(0, 25) + "…" : session?.user?.name}</DropdownMenuLabel>
        
        <DropdownMenuSeparator/>
        {subscription === undefined && (
          <>
            <DropdownMenuLabel className="flex justify-center items-center animate-pulse">
              <LoadingSpinner height="15" width="15"/>
            </DropdownMenuLabel>
            <DropdownMenuSeparator/>
          </>

        )}
        {subscription?.status === "active" && (
          <>
            <DropdownMenuLabel className="text-sm flex items-center justify-center space-x-1 animate-pulse text-pink-700">
              <StarIcon fill="#be185d" className="text-pink-700"/>
              <p className="font-LVRegular tracking-wide text-pink-700">PRO</p>
            </DropdownMenuLabel>
            
            <DropdownMenuSeparator/>
            
            <DropdownMenuItem className="font-LVRegular">
              <ManageBillingButton className="pl-0.5 py-1"/>
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuItem onClick={()=> signOut()} className="font-LVRegular">
          <span className="pl-0.5 py-1">Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
