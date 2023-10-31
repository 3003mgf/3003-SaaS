'use client'

import { subscriptionRef } from "@/lib/converters/Subscription";
import { useSubscriptionStore } from "@/store/store";
import { onSnapshot } from "@firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const SubscriptionProvider = ({children}: {children: React.ReactNode}) => {
  
  const {data:session} = useSession();
  const setSubscription = useSubscriptionStore(state => state.setSubscription);

  useEffect(() => {
    if(!session) return setSubscription(null);

    return onSnapshot(subscriptionRef(session.user.id), (snap) => {
      if(snap.empty){
        console.log("User not subscribed");
        setSubscription(null);
      
      }else{
        console.log("User has a subscription!");
        
        
        setSubscription(snap.docs[0].data());
      }
    }, (error) =>{
      console.log("Error getting the documents - SubProvider", error);
      
    })
  }, [session, setSubscription]);
  
  return <>{children}</>
}
 
export default SubscriptionProvider;