import React, { createContext, useContext } from "react";

const ContextProvider = createContext();
const Context = ({ children }) => {
  const [user, setUser] = useState();
  return (
    <Context.Provider value={{ user, setUser }}>{children}</Context.Provider>
  );
};

export const ContextState = () => {
  return useContext(ContextProvider);
};

export default Context;
