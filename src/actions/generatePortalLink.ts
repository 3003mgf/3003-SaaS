'use server'


import { authOptions } from "@base/auth";
import { adminDb } from "@base/firebase-admin";
import { Session } from "next-auth";
import { getServerSession } from "next-auth";
import { headers } from "next/headers"
import { redirect } from "next/navigation";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16"
});


export async function generatePortalLink(id:string){
  
    const host = headers().get("host");

    const returnUrl = process.env.NODE_ENV === "development" ? `http://${host}/register` : `https://${host}/register`;
  

    const docRef = adminDb.collection('customers').doc(id);
    const docSnap = await docRef.get();
    
  
    if(!docSnap.data()) return console.error("No customer record found with userId:",  id);
    
    
    const stripeId = docSnap.data()!.stripeId;
  
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: stripeId,
      return_url: returnUrl
    })
  
    redirect(stripeSession.url);

    return console.log('hey');
    
  
  
}