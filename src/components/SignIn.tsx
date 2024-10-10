import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";

const SignIn: React.FC<{ auth: any }> = ({ auth }) => {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <div>
      <button onClick={signInWithGoogle}>Sing in with Google</button>
    </div>
  );
};

export default SignIn;
