import { adminDb } from "@base/firebase-admin";
import { NextResponse } from "next/server";

// NOTE: We need to do this BulkWrite because inside the chat we have nested collections, with users, messages, etc.

export async function DELETE(request:Request){

  const { chatId, adminId, userId } = await request.json();

  if(adminId !== userId){
    return NextResponse.json({success: false}, {status:401})
  };

  const ref = adminDb.collection("chats").doc(chatId);

  const bulkWriter = adminDb.bulkWriter();
  const MAX_RETRY_ATTEMPTS = 5;

  bulkWriter.onWriteError((error)=> {
    if(error.failedAttempts < MAX_RETRY_ATTEMPTS){
      return true;
    }else{
      console.log("Failed write at document:", error.documentRef.path);
      return false;
    }
  });


  try{
    await adminDb.recursiveDelete(ref, bulkWriter);

    return NextResponse.json({success: true}, {status:200})
    
  }catch(error){
    
    console.error("Promise rejected: ", error);
    
    return NextResponse.json({success: false}, {status:500})
  }
  


  return NextResponse.json("hey")
};