import "./App.css";
import Chat from "./components/Chat";

import { initializeApp } from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import SignIn from "./components/SignIn";
import MainPage from "./components/mainPage/MainPage";

const fbapp = initializeApp({
  // DB auth tokens
});

const auth = getAuth(fbapp);
const firestore = getFirestore(fbapp);

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      {user ? (
        <MainPage auth={auth} firestore={firestore} user_uid={user.uid} />
      ) : (
        // <Chat auth={auth} firestore={firestore} user_uid={user.uid} />
        <SignIn auth={auth} />
      )}
    </div>
  );
}

export default App;
