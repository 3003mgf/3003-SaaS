import { LanguagesSupported } from "@/store/store";
import { db } from "@base/firebase";
import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions, collection, collectionGroup, doc, limit, orderBy, query, where } from "firebase/firestore";

export interface User {
  id: string;
  email: string;
  name: string;
  image: string;
}

export interface Message {
  id?: string;
  input: string;
  timestamp: Date | null;
  user: User;
  translated?: {
    [K in LanguagesSupported]?: string;
  }
}


const messageConverter: FirestoreDataConverter<Message> = {
  toFirestore: function(message: Message): DocumentData {
    return {
      input: message.input,
      timestamp: message.timestamp,
      user: message.user,
    }
  },


  // How we get it from Firestore
  fromFirestore: function(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Message{
    const data = snapshot.data(options);
    
    return {
      id: snapshot.id,
      input: data.input,
      timestamp: data.timestamp?.toDate(),
      user: data.user,
      translated: data.translated
    }

  }
};


export const messagesRef = (chatId: string) => collection(db, "chats", chatId, "messages").withConverter(messageConverter);

export const limitedMessagesRef = (chatId: string) => query(messagesRef(chatId), limit(25))

export const sortedMessagesRef = (chatId: string) => query(messagesRef(chatId), orderBy("timestamp", "asc"))

export const limitedSortedMessagesRef = (chatId: string) => query(messagesRef(chatId), orderBy("timestamp", "asc"), limit(1))