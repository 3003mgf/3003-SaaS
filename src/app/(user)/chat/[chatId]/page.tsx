import AdminControls from "@/components/AdminControls";
import ChatInput from "@/components/ChatInput";
import ChatMembersBadge from "@/components/ChatMembersBadge";
import ChatMessages from "@/components/ChatMessages";
import { chatMembersRef } from "@/lib/converters/ChatMembers";
import { sortedMessagesRef } from "@/lib/converters/Messages";
import { authOptions } from "@base/auth";
import { getDocs } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

type Props = {
  params:{
    chatId: string;
  }
}

const ChatPage = async({params: {chatId}}:Props) => {

  const session = await getServerSession(authOptions);
  if(!session) redirect("https://3003saas.vercel.app/api/auth/signin?callbackUrl=https%3A%2F%2F3003saas.vercel.app%2F")

   
  const initialMessages = (await getDocs(sortedMessagesRef(chatId))).docs.map(doc => doc.data());
  
  const hasAccess = (await getDocs(chatMembersRef(chatId))).docs.map(doc => doc.id).includes(session.user.id);

  if(!hasAccess) redirect("/chat?error=permission");

  return ( 
    <>
      {/* Admin Controls */}
      <AdminControls chatId={chatId}/>

      {/* ChatMembersBadge */}
      <div>
        <ChatMembersBadge chatId={chatId}/>
      </div>

      {/* ChatMessages */}
      <div className="flex-1 mb-[130.5px]">
        <ChatMessages
          chatId={chatId}
          session={session}
          initialMessages={initialMessages}
        />
      </div>

      {/* ChatInput */}
      <div className="w-full">
        <ChatInput chatId={chatId}/>
      </div>
    </>
   );
}
 
export default ChatPage;