import { db } from "@base/firebase";
import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions, collection, collectionGroup, doc, query, where } from "firebase/firestore";

export interface ChatMembers {
  userId: string;
  email: string;
  timestamp: Date | null;
  isAdmin: boolean;
  chatId: string;
  image: string;
}


const chatMemberConverter: FirestoreDataConverter<ChatMembers> = {
  toFirestore: function(member: ChatMembers): DocumentData {
    return {
      ...member
    }
  },


  // How we get it from Firestore
  fromFirestore: function(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): ChatMembers{
    const data = snapshot.data(options);
    
    return {
      userId: snapshot.id,
      email: data.email,
      timestamp: data.timestamp?.toDate() || null,
      isAdmin: data.isAdmin,
      chatId: data.chatId,
      image: data.image
    }

  }
};

// AddChat can be used to create a chat, passing our ID, or add a person to the chat, passing the other person's ID.
export const addChatRef = (chatId: string, userId: string) => doc(db, "chats", chatId, "members", userId).withConverter(chatMemberConverter)

export const chatMembersRef = (chatId: string) => collection(db, "chats", chatId, "members").withConverter(chatMemberConverter);



// NOTE: We add USER ID
export const chatMemberAdminRef = (chatId:string) => query(collection(db, "chats", chatId, "members"), where("isAdmin", "==", true)).withConverter(chatMemberConverter);

export const chatMembersCollectionGroupRef = (userId: string) => query(collectionGroup(db, "members"), where("userId", "==", userId)).withConverter(chatMemberConverter);