import { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "./ui/button";
import { Copy } from "lucide-react";
import { useToast } from "./ui/use-toast";

const ShareLink = ({isOpen, setIsOpen, chatId}:{isOpen: boolean; setIsOpen:Dispatch<SetStateAction<boolean>>; chatId:string}) => {
  
  const { toast } = useToast();
  const host = window.location.host;

  const linkToChat = process.env.NODE_ENV === 'development' ? `http://${host}/chat/${chatId}` : `https://${host}/chat/${chatId}`;
  
  async function copyToClipboard(){
    try{
      await navigator.clipboard.writeText(linkToChat);

      setTimeout(()=>{
        setIsOpen(false);
      },500);
      toast({
        title:"Copied Successfully",
        description:"Share this to the person you want to chat with! (NOTE: They must be added to the Chat to access it!)",
        className:"bg-green-600 text-white"
      })
    }catch(error){
      console.error("Failed to copy text", error);
    }
  }

  return (
    <Dialog
      onOpenChange={(open)=> setIsOpen(open)}
      open={isOpen}
      defaultOpen={isOpen}
    >
      <DialogTrigger asChild>
        <Button className="font-LVRegular" variant="outline">
          <Copy className="mr-2 h-4 w-4"/>
          Share Link
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md text-center">
        <DialogHeader>
          <DialogTitle className="text-center">Share link</DialogTitle>
          <DialogDescription className="font-LVRegular lg:text-base tracking-wide text-center">
            Any user who has been <span className="text-pink-700">granted access</span> can use this link.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue={linkToChat}
              readOnly
            />
          </div>
          <Button type="submit" onClick={copyToClipboard} size="sm" className="px-3">
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
 
export default ShareLink;