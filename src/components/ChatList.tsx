import { authOptions } from "@base/auth";
import { getDocs } from "firebase/firestore";
import { getServerSession } from "next-auth";


const ChatList = async() => {
  
  const session = await getServerSession(authOptions);

  // const chatsSnap = await getDocs(chatMembersCollectionGroupRef(session?.user.id!));
  
  return ( 
    <div></div>
   );
}
 
export default ChatList;