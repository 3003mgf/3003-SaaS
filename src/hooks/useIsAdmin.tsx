'use client'

import { chatMemberAdminRef } from "@/lib/converters/ChatMembers";
import { getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

const useIsAdmin = ({chatId}:{chatId:string}) => {
  
  const [adminId, setAdminId] = useState<string>("");
  
  useEffect(() => {
    const getAdminMemberId = async() => {
      const adminId = (await (getDocs(chatMemberAdminRef(chatId)))).docs.map(doc => doc.id)[0];

      if(adminId){
        setAdminId(adminId)
      }else{
        console.log({Error: 'No admin member found in "useIsAdmin" Hook'});
      }
    }

    getAdminMemberId();
  }, [chatId]);
  
  return adminId;
}
 
export default useIsAdmin;