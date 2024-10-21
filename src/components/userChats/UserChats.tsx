import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { useAppDispatch, useAppSelector } from "../../hook";
import { setOpenChat } from "../../store/chatSlice";
import {
  ChatCardStyles,
  MainChatCardLink,
  MainChatListStyles,
} from "../../styles/MainPageStyles";

const UserChats: React.FC = () => {
  const dispatch = useAppDispatch();
  const [userChats, setUserChats] = useState<any[]>([]);

  const firestore = useAppSelector(
    (state) => state.firestoreSlice.firestoreInstance
  );
  const user = useAppSelector((state) => state.firestoreSlice.user);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, "users", `${user.uid}`, "chats"),
      (snapshot) => {
        const userChatsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setUserChats(userChatsData);
      }
    );

    return () => unsubscribe();
  }, [firestore]);

  return (
    <div>
      {userChats.length > 0 ? (
        <MainChatListStyles>
          <ul>
            {userChats.map((chat) => {
              return (
                <li key={chat.id}>
                  <MainChatCardLink
                    to="/chat"
                    onClick={() => dispatch(setOpenChat(chat.id))}
                  >
                    <ChatCardStyles>
                      <img src={chat.chatPhotoURL} />
                      <h2>{chat.name}</h2>
                      <p>{chat.situation}</p>
                    </ChatCardStyles>
                  </MainChatCardLink>
                </li>
              );
            })}
          </ul>
        </MainChatListStyles>
      ) : (
        <p>No Chats here...</p>
      )}
    </div>
  );
};

export default UserChats;
