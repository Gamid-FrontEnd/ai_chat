import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Chat from "../Chat";
import { Link } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";

import { useAppDispatch } from "../../hook";
import { openChat } from "../../store/chatSlice";
import MainChatList from "./MainChatList";

interface MainPageProps {
  auth: any;
  firestore: any;
  user_uid: string;
}

const MainPage: React.FC<MainPageProps> = ({ auth, firestore, user_uid }) => {
  const dispatch = useAppDispatch();
  const [chats, setChats] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, "all_chats"),
      (snapshot) => {
        const chatsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setChats(chatsData);
      }
    );

    return () => unsubscribe();
  }, [firestore]);

  return (
    <div>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/my_chats">My Chats</Link>
            </li>
            <li>
              <Link to="/all_chats">All Chats</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div>
        {chats &&
          chats.map((chat) => {
            return (
              <button onClick={() => dispatch(openChat(chat.id))}>
                {chat.id}
              </button>
            );
          })}
      </div>

      <div>
        <Routes>
          <Route
            path="/my_chats"
            element={
              <Chat auth={auth} firestore={firestore} user_uid={user_uid} />
            }
          />
          <Route path="/all_chats" element={<MainChatList />} />
        </Routes>
      </div>
    </div>
  );
};

export default MainPage;
