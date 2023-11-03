import ChatList from "@/components/ChatList";
import ChatPermissionError from "@/components/ChatPermissionError";
import { authOptions } from "@base/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

type Props = {
  params: {

  },
  searchParams: {
    error?: string
  }
}

const ChatsPage = ({ searchParams: { error } }: Props) => {
  
  const session = getServerSession(authOptions);
  
  if(!session) redirect("https://3003saas.vercel.app/api/auth/signin?callbackUrl=https%3A%2F%2F3003saas.vercel.app%2F")

  
  return ( 
    <div>
      {/* Chat Permission chat */}
      {error && (
        <div className="m-2">
          <ChatPermissionError/>
        </div>
      )}


      {/* ChatList */}
      <ChatList/>
    </div>
   );
}
 
export default ChatsPage;