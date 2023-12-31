import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import "react-toastify/dist/ReactToastify.css";
const SignUp = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPssword] = useState();
  const [loading, setLoading] = useState(false);
  const toggleVisibility = () =>
    setIsPasswordVisible((prevState) => !prevState);

  const submitHandler = async () => {
    setLoading(true);

    if (!name || !email || !password) {
      toast.warning("Please Fill all the Fields", {
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
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const reqBody = {
        query: `
        mutation{
        createUser(user:{
                email:"${email}",
                password:"${password}",
                name:"${name}"
        }){
        _id
       email
      }
     }
        `,
      };
      const { data } = await axios.post(
        "http://localhost:8000/graphql",
        reqBody,
        config
      );

      toast.success("Registration Successful", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
    } catch (error) {
      toast.warning(`${error}`, {
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

  return (
    <div className="w-[100%]">
      <div className="text-center">
        <img
          className="w-48 mx-auto"
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
          alt="logo"
        />
        <h4 className="pb-1 mt-1 mb-2 text-xl font-semibold">
          Easy Event Team
        </h4>
      </div>
      <div className="w-[100%]">
        <div className="w-[60%] mx-auto">
          <form className="w-full max-w-lg border border-blue-300">
            <div className="flex justify-around px-2 my-4 text-lg">
              <span>Name </span>
              <input
                className="w-full text-center rounded outline-none focus:ring-b focus:border-blue-500 marker:focus:ring-1"
                type="text"
                name="name"
                id="name"
                placeholder="Enter your Full Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex justify-around px-2 my-4 text-lg">
              <span>Email </span>
              <input
                className="w-full text-center rounded outline-none focus:ring-b focus:border-blue-500 marker:focus:ring-1"
                type="text"
                name="email"
                id="email"
                placeholder="Enter your Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col justify-around px-2 my-4 text-lg">
              <div className="flex justify-around text-lg text-center">
                <span>Password</span>
                <input
                  className="w-full text-center rounded outline-none focus:ring-b focus:border-blue-500focus:ring-1"
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="*************"
                  onChange={(e) => setPssword(e.target.value)}
                />
              </div>
              <div className="flex">
                <label className="flex items-center my-4">
                  <input
                    type="checkbox"
                    className="w-4 h-4 mr-2"
                    checked={isPasswordVisible}
                    onChange={toggleVisibility}
                  />
                  <span className="text-sm text-gray-600">Show password</span>
                </label>
              </div>
            </div>

            <div className="px-2 pt-1 pb-1 mb-2 text-center">
              <button
                className="mb-2 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                type="button"
                style={{
                  background:
                    "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                }}
                onClick={(e) => {
                  submitHandler();
                }}
              >
                {loading ? (
                  <div
                    role="status"
                    className="flex items-center justify-center"
                  >
                    <svg
                      aria-hidden="true"
                      class="w-8 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span class="sr-only">Loading...</span>
                  </div>
                ) : (
                  "Sign Up"
                )}
              </button>
              <ToastContainer />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
