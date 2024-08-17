// src/hooks/useFirebase.ts

import { useState, useEffect } from "react";
import { auth } from "../firebase/firebaseApp";
import { User } from "firebase/auth";

export const useFirebase = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return unsubscribe;
  }, []);

  return { user };
};
