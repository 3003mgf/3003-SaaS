'use client'

import { useSubscriptionStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";

const UpgradeBanner = () => {

  const {data: session} = useSession();
  const subscription = useSubscriptionStore(state => state.subscription);
  const isPro = subscription?.status === "active";
  const router = useRouter();
  
  
  if(!session || subscription === undefined || isPro) return null;
  
  return ( 
    <Button
      onClick={()=> router.push("/register")}
      className="w-full rounded-none bg-gradient-to-r from-[#7775D6] to-[#E935C1] px-3 py-2 font-LVRegular tracking-wide text-white text-center
      hover:shadow-md  hover:animate-pulse"
    >
      Upgrade to Pro to unlock all features!
    </Button>
   );
}
 
export default UpgradeBanner;