import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import { useAppSelector } from "../hook";

const SignIn: React.FC = () => {
  const auth = useAppSelector((state) => state.firestoreSlice.auth);
  const firebase = useAppSelector(
    (state) => state.firestoreSlice.firestoreInstance
  );

  const [email, setEmail] = useState("");
  const [password, usePassword] = useState("");

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const singInWithEmailAndPassword = () => {
    signInWithEmailAndPassword(firebase, email, password);
  };

  return (
    <div>
      <button onClick={singInWithEmailAndPassword}>Sign in</button>
      <button onClick={signInWithGoogle}>Sing in with Google</button>
    </div>
  );
};

export default SignIn;
