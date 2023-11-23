import React from "react";
import { ContextState } from "../context/Context";

const Events = () => {
  const {setUser}=ContextState()
  const user=JSON.parse(localStorage.getItem("userInfo"));
  setUser(user);
  console.log(user)
  return (
    <div className="flex text-center h-screen justify-center items-center bg-slate-400">
      Events
    </div>
  );
};

export default Events;
