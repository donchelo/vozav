// src/context/FirebaseContext.tsx

import React, { createContext, useContext } from "react";
import { useFirebase } from "../hooks/useFirebase";

const FirebaseContext = createContext<ReturnType<typeof useFirebase> | null>(
  null,
);

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const firebase = useFirebase();

  return (
    <FirebaseContext.Provider value={firebase}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebaseContext = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error(
      "useFirebaseContext must be used within a FirebaseProvider",
    );
  }
  return context;
};
