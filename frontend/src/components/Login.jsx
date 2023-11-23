import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { ContextState } from "../context/Context";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPssword] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
const { user } = ContextState();
  const toggleVisibility = () =>
    setIsPasswordVisible((prevState) => !prevState);
  const submitHandler = async () => {
    setLoading(true);
    console.log(email, password);
    if (!email || !password) {
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
       query{
  login(user:{
    email:"${email}",
    password:"${password}"
  }){
    _id
    token
  }
}
        `,
      };
      const { data } = await axios.post(
        "http://localhost:8000/graphql",
        reqBody,
        config
      );
      console.log(data);
      toast.success("LoginSuccessful", {
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
              <div className="flex justify-around my-4 text-lg text-center">
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
                <label className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 mr-2"
                    checked={isPasswordVisible}
                    onChange={toggleVisibility}
                  />
                  <span className="text-sm text-gray-600">Show password</span>
                </label>
                <ToastContainer />
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
                Log in
              </button>

              {/* <!--Forgot password link--> */}
              <a href="#!">Forgot password?</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
