'use client'

import { generatePortalLink } from "@/actions/generatePortalLink";
import { useSession } from "next-auth/react";

function ManageBillingButton({className}:{className?:string}){

    const {data: session} = useSession();
  
    if(!session?.user.id) return;
    
    
    const { user: { id }} = session;
    if(!id) return;
    console.log(id);
    
  
  return (
    <form action={()=> generatePortalLink(id)} className="">
      <button type="submit" disabled={!id} className={`w-full rounded-md ${className ? className : "px-3 py-2"} bg-transparent disabled:cursor-not-allowed disabled:opacity-75`}>
        Manage Billing
      </button>
    </form>
  )
}
 
export default ManageBillingButton;