import React, { useState } from "react";
import SignOut from "./SignOut";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  collection,
  limit,
  orderBy,
  query,
  addDoc,
  serverTimestamp,
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
  auth: any;
  firestore: any;
  user_uid: string;
}

const Chat: React.FC<ChatProps> = ({
  character,
  auth,
  firestore,
  user_uid,
}) => {
  const currentChat = useAppSelector((state) => state.chats.openChat);
  const [input, setInput] = useState<string>("");

  const messagesRef = collection(
    firestore,
    "users",
    `${user_uid}`,
    `${currentChat}`
  );
  const q = query(messagesRef, orderBy("createdAt"), limit(25));

  const [messages] = useCollectionData(q);

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await addDoc(messagesRef, {
      text: input,
      createdAt: serverTimestamp(),
      uid,
      photoURL,
    });

    setInput("");
  };

  const ChatMessage: React.FC<MessageProps> = (props) => {
    const { text, uid, photo } = props.message;

    const messageClass = uid === auth.currentUser.uid;

    return (
      <div className={`message ${messageClass}`}>
        <img src={photo.toString()} width={30} />
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
      <div>
        <SignOut auth={auth} />
      </div>
    </div>
  );
};

export default Chat;
