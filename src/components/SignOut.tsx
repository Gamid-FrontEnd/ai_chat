import React from "react";
import { signOut, Auth } from "firebase/auth";

const SignOut: React.FC<{ auth: Auth }> = ({ auth }) => {
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
