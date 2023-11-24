import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

export function BookModal({ el }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleOpen = () => {
      setOpen(!open);
      console.log(el._id)
    };
    const user = JSON.parse(localStorage.getItem("userInfo"));
    const confirmBook = async () => {
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
       mutation{
  bookEvent(eventId:"${el._id}"){
    _id
    event{
      title
      price
      desc
      date
    }
    user{
      email
    }
  }
}

        `,
      };
      const { data } = await axios.post(
        "http://localhost:8000/graphql",
        reqBody,
        config
      );
      console.log("booked the event", data);

      if (!data.errors) {
        toast.success("Event has bokked Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        handleOpen();
      } else {
        toast.error(`${data.errors[0].message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        handleOpen();
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
      handleOpen();
    }
  };
  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        Book event
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogBody className="flex items-center justify-center h-[20vh]">
          <h1 className="text-3xl"> Do you want to Confirm</h1>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
            <Button variant="gradient" color="green" onClick={confirmBook}>
              <span>Confirm</span>
            </Button>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
