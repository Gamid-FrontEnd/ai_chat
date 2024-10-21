import { useAppDispatch, useAppSelector } from "../../hook";
import { setOpenChat } from "../../store/chatSlice";
import {
  ChatCardStyles,
  MainChatCardLink,
  MainChatListStyles,
} from "../../styles/MainPageStyles";

const MainChatList = () => {
  const dispatch = useAppDispatch();
  const allChatsList = useAppSelector((state) => state.chats.allChats);

  return (
    <div>
      <MainChatListStyles>
        <ul>
          {allChatsList.map((chat) => {
            return (
              <li>
                <MainChatCardLink
                  key={chat.id}
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
    </div>
  );
};

export default MainChatList;
