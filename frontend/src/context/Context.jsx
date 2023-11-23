import React, { createContext, useContext, useState } from "react";

const ContextProvider = createContext();
const Context = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <ContextProvider.Provider value={{ user, setUser }}>
      {children}
    </ContextProvider.Provider>
  );
};


export const ContextState = () => {
  return useContext(ContextProvider);
};

export default Context;
