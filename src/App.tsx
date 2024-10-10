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
  apiKey: "AIzaSyDzx5d6E3bmaDjTMCY3fp2QbgZE2mVTonA",
  authDomain: "aichat-mgsi.firebaseapp.com",
  projectId: "aichat-mgsi",
  storageBucket: "aichat-mgsi.appspot.com",
  messagingSenderId: "237460704885",
  appId: "1:237460704885:web:8a45cdd2dd3056ea69723c",
  measurementId: "G-6QWCM88KBQ",
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
