import React from "react";

const Events = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  console.log(user);
  return (
    <div className="flex text-center h-screen justify-center items-center bg-slate-400">
      Events
    </div>
  );
};

export default Events;
