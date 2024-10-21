import { Link } from "react-router-dom";
import styled from "styled-components";

// STYLES

// Header
export const HeaderStyles = styled.header`
  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  display: flex;
  align-items: center;
  box-shadow: 0 0 10px 0 black;

  * {
    display: inline;
  }
`;

export const NavDiv = styled.nav`
  li {
    margin: 20px;
  }
`;

export const NavLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

export const AvatarStyles = styled.div`
  margin-left: auto;
  margin-right: 30px;
  img {
    width: 40px;
    border-radius: 50%;
  }
`;

// Main Content
export const MainPageContent = styled.div`
  margin-top: 100px;
`;

// Main Chat List
export const MainChatListStyles = styled.div`
  ul {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 60px;
    list-style: none;
  }
`;

export const MainChatCardLink = styled(Link)`
  text-decoration: none;
`;

export const ChatCardStyles = styled.div`
  padding: 15px;
  text-decoration: none;
  background-color: #a18267;

  border-radius: 10px;
  border: 1px solid white;

  img {
    width: 150px;
    height: 150px;
    border-radius: 6px;
  }

  h2 {
    color: white;
  }

  p {
    color: aliceblue;
  }
`;
