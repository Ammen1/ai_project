import React from "react";
import styles from "../style";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios";
import { robot, j, h, bul } from "../assets";

const Login = () => {
  const history = useNavigate();
  const initialFormData = Object.freeze({
    email: "",
    password: "",
  });

  const [formData, updateFormData] = useState(initialFormData);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    axiosInstance
      .post(`token/`, {
        grant_type: "password",
        email: formData.email,
        password: formData.password,
      })
      .then((res) => {
        localStorage.setItem("access_token", res.data.access_token);
        localStorage.setItem("refresh_token", res.data.refresh_token);
        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + localStorage.getItem("access_token");
        history("/admindashboard");
        window.location.reload();
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          const errorData = error.response.data;
          if (errorData.email) {
            setErrorMessage("Invalid email or password.");
          }
          if (error.response && error.response.status === 401) {
            setErrorMessage("amen.");
          } else {
            setErrorMessage("Invalid email or password.");
          }
        } else {
          setErrorMessage("An error occurred. Please try again.");
        }
      });
  };

  return (
    <section
      className={`flex md:flex-row mt-36 flex-col bg-slate-950 ${styles.paddingY}`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
        <div className="hidden sm:block">
          <img
            className="w-[80%] h-[80%] rounded-[15px] ml-12 mr-12  mt-8 relative "
            src={bul}
            alt=""
          />
        </div>

        <div className="bg-gray-900  relative flex w-[80%] h-[80%] mr-12 ml-8 mt-8  flex-col justify-center rounded-[15px]">
          <form className="max-w-[400px]  w-full  mx-auto rounded-lg  bg-gray-1000 p-8 px-8">
            <h2 className="text-3xl  bg-teal-500 text-gradient font-bold text-center">
              Signin
            </h2>
            <div className="flex flex-col text-gray-400 py-2">
              <label>Email</label>
              <input
                className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                type="email"
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col text-gray-400 py-2">
              <label>Password</label>
              <input
                className="p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                type="password"
                name="password"
                label="Password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-between text-gray-400 py-2">
              <p className="flex items-center text-gradient font-bold">
                <input className="mr-2" type="checkbox" /> Remember Me
              </p>
            </div>
            <button
              className="w-full my-5 py-2 bg-teal-500 shadow-lg text-gradient hover:animate-pulse shadow-teal-500/50 text-white font-bold rounded-lg"
              type="submit"
              onClick={handleSubmit}
            >
              Login
            </button>
            {errorMessage && (
              <p className="text-red-500 text-center">{errorMessage}</p>
            )}
          </form>
        </div>
        {/* gradient start */}
        <div className="absolute z-[0] w-[10%] h-[200%] top-0 pink__gradient" />
        {/* <div className="absolute z-[3] w-[5%] h-[200%] rounded-full white__gradient bottom-40" /> */}
        <div className="absolute z-[0] w-[10%] h-[200%] right-20 bottom-20 blue__gradient" />
        {/* gradient end */}
        <div className="flex justify-between text-gray-400 py-2">
          <div className="absolute z-[99] w-[10%]  h-[70%] top-0 blue__gradient animate-spin" />
        </div>
      </div>
    </section>
  );
};

export default Login;
