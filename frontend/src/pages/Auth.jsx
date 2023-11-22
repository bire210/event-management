import React, { useState } from "react";
import Login from "../components/Login";
import SignUp from "../components/Signup";

const Auth = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  return (
    <div className="flex flex-col w-full h-screen bg-slate-300">
      <div className="flex text-center items-center w-[80%] mx-auto justify-center h-[10%] border">
        Chat a app
      </div>
      <div className="flex flex-col h-screen w-[50%] mx-auto mt-3 border bg-white">
        <div className="flex h-[10%]">
          <button
            onClick={() => setIsLoginForm(true)}
            className={`flex w-[50%] justify-center text-center  rounded px-6 pb-2 pt-2 text-xs font-medium uppercase leading-norma shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] items-center h-[100%]`}
            style={
              isLoginForm
                ? {
                    background:
                      "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                    color: "white",
                  }
                : {}
            }
          >
            LOGIN
          </button>
          <button
            onClick={() => setIsLoginForm(false)}
            className={`flex w-[50%] justify-center text-center  rounded px-6 pb-2 pt-2 text-xs font-medium uppercase leading-norma shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] items-center h-[100%]`}
            style={
              isLoginForm
                ? {}
                : {
                    background:
                      "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                    color: "white",
                  }
            }
          >
            SIGN-UP
          </button>
        </div>
        <div className="h-[90%] my-2">
          {isLoginForm ? <Login /> : <SignUp />}
        </div>
      </div>
    </div>
  );
};

export default Auth;
