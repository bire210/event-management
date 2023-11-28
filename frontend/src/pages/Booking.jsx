import React, { useEffect, useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";

const Booking = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [bookedEvents, setBookedEvent] = useState([]);
  const [loading, setLoading] = useState(false);
 
  const getAllBooked = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const reqBody = {
        query: `
       query{
  bookings{
    _id
    user{
      email
    }
    event{
      title
      date
      price
      desc
    }
  }
}
        `,
      };
      const data = await axios.post(
        "http://localhost:8000/graphql",
        reqBody,
        config
      );
      

      if (data.data) {
        setBookedEvent(data.data.data.bookings);
      }

      setLoading(false);
    } catch (error) {
      toast.warning(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllBooked();
  }, []);



  return (
    <div className="flex flex-col">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-20 px-20">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Event name
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Event creator
              </th>
            </tr>
          </thead>

          {!bookedEvents ? (
            <h1 className="text-center font-bold text-black font-serif w-full">
              No Booking event
            </h1>
          ) : (
            <tbody>
              {bookedEvents.map((event) => {
                return (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    key={event._id}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {event.event.title}
                    </th>
                    <td className="px-6 py-4">{event.event.date}</td>
                    <td className="px-6 py-4">{event.event.desc}</td>
                    <td className="px-6 py-4">{event.event.price}</td>
                    <td className="px-6 py-4">{event.user.email}</td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default Booking;
