import React, { createContext, useState } from "react";

export const authContext = createContext();

export function ProvideAuth({ children }) {
  const [userLogin, setUserLogin] = useState({});

  return (
    <authContext.Provider value={{ userLogin, setUserLogin }}>
      {children}
    </authContext.Provider>
  );
}
