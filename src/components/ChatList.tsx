import { ChatMembers, chatMembersCollectionGroupRef } from "@/lib/converters/ChatMembers";
import { authOptions } from "@base/auth";
import { getDocs } from "firebase/firestore";
import { getServerSession } from "next-auth";
import ChatListRows from "./ChatListRows";
import { timeStamp } from "console";


const ChatList = async() => {
  
  const session = await getServerSession(authOptions);
  
  if(!session) return;

  const chatsSnap = await getDocs(chatMembersCollectionGroupRef(session.user.id));
    

  
  const initialChats = chatsSnap.docs.map((doc)=> ({
    ...doc.data(),
    timeStamp: null,
  }))

  

  return <ChatListRows initialChats={initialChats}/>
}
 
export default ChatList;