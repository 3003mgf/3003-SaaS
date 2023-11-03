'use client'

import { Button } from "@/components/ui/button"
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
import useIsAdmin from "@/hooks/useIsAdmin";
import { useSession } from "next-auth/react";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "@base/firebase";

const DeleteChatButton = ({chatId}:{chatId:string}) => {
  
  const {data: session} = useSession();
  const userId = session?.user.id;
  const adminId = useIsAdmin({chatId});
  const {toast} = useToast();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async() =>{
    if(!userId) return;
    if(deleting) return;

    setDeleting(true);
    toast({
      title: "Deleting chat",
      description: "Please wait while we delete the chat..."
    });

    await fetch("http://localhost:3000/api/chat/delete", {
      method:"DELETE",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({chatId, adminId, userId})
    }).then(res => {
      toast({
        title:"Chat deleted!",
        description: "Your chat has been deleted!",
        className:"bg-green-600 text-white"
      });

      router.replace("/chat");
    }).catch(error => {
      console.error("Error deleting the chat: ", error);

      toast({
        title: "Error",
        description: "There was an error deleting your chat!",
        variant: "destructive"
      });
      
    }).finally(()=>{
      setOpen(false);
    })
  };
  
  return (
    session?.user.id === adminId && (
      <Dialog
        onOpenChange={(open)=> setOpen(open)}
        open={open}
        defaultOpen={open}
      >
        <DialogTrigger asChild>
          <Button className="font-LVRegular" variant="destructive">Delete Chat</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This will delete the chat for all users.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 space-x-2">
            <Button variant={"destructive"} onClick={handleDelete}>
              Delete
            </Button>
            <Button variant={"outline"} onClick={()=> setOpen(false)}>
              Cancel
            </Button>
          </div>
          
        </DialogContent>
      </Dialog>
    )
  )
}
 
export default DeleteChatButton;