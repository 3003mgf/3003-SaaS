import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

const ChatPermissionError = () => {
  return ( 
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle className="font-LVRegular text-lg -mt-1">Whoops...</AlertTitle>
      <AlertDescription>
        <p className="flex-1 mb-3 font-LVRegular text-base">
          {"You don't have permission to view this chat."}
          <br />
          <span className="font-extrabold text-white/50">Please ask the chat admin to add you to the chat.</span>
        </p>

        <Link href="/chat" replace>
          <Button className="font-LVRegular tracking-wide" variant={"destructive"}>Dismiss</Button>
        </Link>
      </AlertDescription>
    </Alert>
  
   );
}
 
export default ChatPermissionError;