import React, { createContext, useState } from "react";

export const authContext = createContext();

export function ProvideAuth({ children }) {
  const [userLogin, setUserLogin] = useState({});
  console.log("context:", userLogin.connected);

  return (
    <authContext.Provider value={{ userLogin, setUserLogin }}>
      {children}
    </authContext.Provider>
  );
}
