import "./App.css";

import { initializeApp } from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import SignIn from "./components/SignIn";
import MainPage from "./components/mainPage/MainPage";
import { useAppDispatch } from "./hook";
import { useEffect } from "react";
import { setAuth, setFirestoreInstance, setUser } from "./store/firestoreSlice";
import { setAllChats } from "./store/chatSlice";

const fbapp = initializeApp({
  // Add your tokens
});

const auth = getAuth(fbapp);
const firestore = getFirestore(fbapp);

function App() {
  const dispatch = useAppDispatch();
  const [user] = useAuthState(auth);

  useEffect(() => {
    dispatch(setFirestoreInstance(firestore));
    dispatch(setAuth(auth));
    dispatch(setUser(user));

    const unsubscribe = onSnapshot(
      collection(firestore, "all_chats"),
      (snapshot) => {
        const chatsData = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || "Unnamed Chat",
            chatPhotoURL:
              data.chatPhotoURL ||
              "https://upload.wikimedia.org/wikipedia/commons/6/63/Logo_La_Linea_100x100.png",
            creatorId: data.creatorId || "Unknown",
            appearance: data.appearance || "Unknown appearance",
            personality: data.personality || "Unknown personality",
            situation: data.situation || "Unknown situation",
            isNSFW: data.isNSFW || false,
          };
        });

        dispatch(setAllChats(chatsData));
      }
    );

    return () => unsubscribe();
  }, [firestore, user, auth]);

  return <div className="App">{user ? <MainPage /> : <SignIn />}</div>;
}

export default App;
