import React, { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  collection,
  limit,
  orderBy,
  query,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import { useAppSelector } from "../hook";

interface MessageProps {
  message: {
    text: string;
    uid: string;
    photo: string;
  };
}

interface ChatProps {
  character?: string;
}

const Chat: React.FC<ChatProps> = ({ character }) => {
  const [input, setInput] = useState<string>("");

  const currentChat = useAppSelector((state) => state.chats.openChat);
  const allChats = useAppSelector((state) => state.chats.allChats);

  const firestore = useAppSelector(
    (state) => state.firestoreSlice.firestoreInstance
  );

  const user = useAppSelector((state) => state.firestoreSlice.user);

  const auth = useAppSelector((state) => state.firestoreSlice.auth);

  const messagesRef = collection(
    firestore,
    "users",
    `${user.uid}`,
    "chats",
    `${currentChat}`,
    "messages"
  );
  const q = query(messagesRef, orderBy("createdAt"), limit(25));

  const [messages] = useCollectionData(q);

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    const chatRef = doc(firestore, "users", user.uid, "chats", currentChat);

    const chatDoc = await getDoc(chatRef);

    if (!chatDoc.exists()) {
      const selectedNewChat = allChats.find((chat) => chat.id === currentChat);
      await setDoc(chatRef, {
        ...selectedNewChat,
        createdAt: serverTimestamp(),
      });
    }

    let chatInfo = allChats.find((chat) => chat.id === currentChat);

    await addDoc(messagesRef, {
      sender: "user",
      text: input,
      createdAt: serverTimestamp(),
      uid,
      photoURL,
    });

    const response = await fetch(
      "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
      {
        headers: {
          Authorization: "Bearer TOKEN",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ inputs: input }),
      }
    );
    const result = await response.json();

    await addDoc(messagesRef, {
      sender: "bot",
      text: result[0].generated_text,
      createdAt: serverTimestamp(),
      uid,
      photoURL: chatInfo?.chatPhotoURL,
    });

    setInput("");
  };

  const ChatMessage: React.FC<MessageProps> = (props) => {
    const { text, uid, photo } = props.message;

    const messageClass = uid === auth.currentUser.uid;

    return (
      <div className={`message ${messageClass}`}>
        <img src={photo} width={30} />
        <p>{text}</p>
      </div>
    );
  };

  return (
    <div>
      <div>
        <div>
          {messages &&
            messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={{ text: msg.text, uid: msg.uid, photo: msg.photoURL }}
              />
            ))}
        </div>

        <form onSubmit={handleSend}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend(e as any)}
            placeholder="Напишите сообщение..."
          />

          <button type="submit">Отправить</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
