import { Route, Routes, Link } from "react-router-dom";
import { useAppSelector } from "../../hook";

import Chat from "../Chat";
import MainChatList from "./MainChatList";
import UserChats from "../userChats/UserChats";
import UserPage from "../userChats/UserPage";
import CreateChat from "../createChat/CreateChat";

import {
  AvatarStyles,
  HeaderStyles,
  MainPageContent,
  NavDiv,
  NavLink,
} from "../../styles/MainPageStyles";

const MainPage: React.FC = () => {
  const user = useAppSelector((state) => state.firestoreSlice.user);

  return (
    <div>
      <HeaderStyles>
        <NavDiv>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/my_chats">My Chats</NavLink>
            </li>
            <li>
              <NavLink to="/all_chats">All Chats</NavLink>
            </li>
            <li>
              <NavLink to="/create_chat">Create</NavLink>
            </li>
          </ul>
        </NavDiv>
        <AvatarStyles>
          {user ? (
            <Link to="/user_profile">
              <img src={user.photoURL} />
            </Link>
          ) : (
            <p>Lodaing...</p>
          )}
        </AvatarStyles>
      </HeaderStyles>

      <MainPageContent>
        {user ? (
          <div>
            <Routes>
              <Route path="/chat" element={<Chat />} />
              <Route path="/my_chats" element={<UserChats />} />
              <Route path="/all_chats" element={<MainChatList />} />
              <Route path="/user_profile" element={<UserPage />} />
              <Route path="/create_chat" element={<CreateChat />} />
            </Routes>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </MainPageContent>
    </div>
  );
};

export default MainPage;
