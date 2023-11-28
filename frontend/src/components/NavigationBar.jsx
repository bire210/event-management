
import React from "react";
import { NavLink } from "react-router-dom";


const NavigationBar = () => {
  let U = JSON.parse(localStorage.getItem("userInfo")) || "";


  return (
    <header className="fixed top-0 w-[100%] h-14 bg-blue-400 px-4 py-0 flex items-center overflow-hidden">
      <div className="w-[20%]">
        <h1 className="m-0 text-2xl hover:cursor-pointer">
          <NavLink to="/">Easy Events</NavLink>
        </h1>
      </div>
      <nav className="mr-0 my-0 ml-6 p-0 list-none flex w-[80%]">
        <ul className="flex justify-around w-[100%]">
          <li className="text-yellow-500 text-3xl">
            <NavLink to="/events">Events</NavLink>
          </li>
          <li className="text-yellow-500 text-3xl">
            <NavLink to="/bookings">Booking</NavLink>
          </li>
          <li className="text-yellow-500 text-3xl">
            {U?.email ? (
              U?.email || <NavLink to="/auth">Login</NavLink>
            ) : (
              <NavLink to="/auth">Login</NavLink>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavigationBar;
