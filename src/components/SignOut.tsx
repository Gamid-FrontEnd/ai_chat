import React from "react";
import { signOut } from "firebase/auth";
import { useAppSelector } from "../hook";

const SignOut: React.FC = () => {
  const auth = useAppSelector((state) => state.firestoreSlice.auth);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  return (
    <div>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default SignOut;
