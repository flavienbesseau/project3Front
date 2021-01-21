import React, { createContext, useState } from "react";

export const authContext = createContext();

export function ProvideAuth({ children }) {
  
  const [connected, setConnected] = useState(null);
  console.log("context:", connected);

  return (
    <authContext.Provider value={{ connected, setConnected }}>
      {children}
    </authContext.Provider>
  );
}
