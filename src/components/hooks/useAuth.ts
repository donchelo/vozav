// src/hooks/useAuth.ts
import { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase/config";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    console.log("useAuth effect running");
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        console.log("Auth state changed:", user);
        setUser(user);
        setLoading(false);
      },
      (error) => {
        console.error("Auth error:", error);
        setError(error);
        setLoading(false);
      }
    );

    return () => {
      console.log("useAuth effect cleanup");
      unsubscribe();
    };
  }, []);

  return { user, loading, error };
};