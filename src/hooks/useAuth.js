import React, { useState, useEffect } from "react";
import { auth } from "../firebaseBackend";
import { onAuthStateChanged } from "firebase/auth";

export default function useAuth() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
    });

    return () => unsub();
  }, [currentUser]);

  return { currentUser };
}
