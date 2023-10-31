'use client'

import { useSubscriptionStore } from "@/store/store";
import { db } from "@base/firebase";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import ManageBillingButton from "./ManageBillingButton";

const CheckoutButton = () => {
  
  const {data: session} = useSession();
  const [loading, setLoading] = useState(false);

  const subscription = useSubscriptionStore(state => state.subscription);
 
  const isLoadingSubscription = subscription === undefined;
  const isSubscribed = subscription?.status === "active";

  console.log(subscription);
  

  const createCheckoutSession = async() =>{
    if(!session) return;
    
    // push a doc into Firestore DB
    setLoading(true);

    const docRef = await addDoc(collection(db, "customers", session.user.id, "checkout_sessions"), {
      price: "price_1O6iIbGZz86c4aljF4ugLGrG",
      success_url: window.location.origin,
      cancel_url: window.location.origin
    })


    // stripe extension on firebase create a checkout session

    return onSnapshot(docRef, snap => {
      const data = snap.data();
      const url = data?.url;
      const error = data?.error;

      if(error){
        alert("An error occured: " + error.message);
        setLoading(false);
      }

      if(url){
        // redirect user to checkout page
        window.location.assign(url);
        setLoading(false);
      }
    })
  
  };

  return ( 
    <div className="flex flex-col space-y-2">
      {/* If the user is subscribed shows the user is subscribed */}
      
      
      <div className={`w-full bg-pink-800 ${loading && "opacity-80"} py-2 text-white font-semibold text-center mt-8 text-sm rounded-md leading-6 shadow-sm cursor-pointer hover:bg-pink-700 transition-colors duration-300 h-[43px] flex justify-center items-center`}>
        {
          isSubscribed ? 
          (
            <ManageBillingButton/>
          ): 

          isLoadingSubscription ? 
          (
            <ThreeDots
              height="20"
              width="20"
              color="#f5f5f5"
              ariaLabel="three-dots-loading"
              radius="9"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          ):
          loading ? (
            <TailSpin
              height="20"
              width="20"
              color="#f5f5f5"
              radius="1"
              ariaLabel="tail-spin-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          ):
          (
            <button onClick={()=> createCheckoutSession()} disabled={loading} className="w-full bg-transparent px-3 rounded-md py-2 disabled:cursor-not-allowed">
              Sign Up
            </button>
          )
        }
      </div>
    </div>
   );
}
 
export default CheckoutButton;