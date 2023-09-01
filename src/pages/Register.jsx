import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axios";
import { NavLink } from "react-router-dom";

const Register = () => {
  const history = useNavigate();
  const initialFormData = Object.freeze({
    email: "",
    username: "",
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
      .post(`user/create/`, {
        email: formData.email,
        user_name: formData.username,
        password: formData.password,
      })
      .then((res) => {
        history("/admindashboard");
        console.log(res);
        console.log(res.data);
      })
      .catch((error) => {
        setErrorMessage("Username or Email is already taken.");
      });
  };

  return (
    <section className="overflow-y-hidden">
      <div className=" grid-cols-3  h-screen w-full">
        <div className="bg-gray-800 relative flex w-full h-full mr-9 mt-32  flex-col justify-center ">
          <form className="max-w-[400px]   mx-auto rounded-lg  bg-gray-950 p-8 px-8">
            <h2 className="text-3xl  bg-teal-500 text-gradient font-bold text-center">
              Sign Up
            </h2>
            {errorMessage && (
              <p className="text-red-500 text-center">{errorMessage}</p>
            )}
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
              <label>Username</label>
              <input
                className="p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                variant="outlined"
                type="text"
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
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
              Sign Up
            </button>
            <NavLink to={"/login"} className="link hover:animate-bounce ">
              <div className="flex items-center text-gradient font-bold">
                <h1 className=" font-bold ">
                  Already have an account? Sign in
                </h1>
              </div>
            </NavLink>
          </form>
        </div>
        {/* gradient start */}
        {/* <div className="absolute z-[999] w-[20%] h-[100%] top-0 pink__gradient" /> */}
        <div className="absolute z-[3] w-[20%] h-[100%] rounded-full yellow__gradient bottom-40 " />
        <div className="absolute z-[0] w-[20%] h-[100%] right-20 bottom-20 blue__gradient animate-pulse" />
        {/* gradient end */}
      </div>
      <div className="flex justify-between bg-yellow-400 text-gray-400 py-2">
        <div className="absolute z-[999] w-[10%] h-[100%] top-0 blue__gradient animate-ping" />
      </div>
    </section>
  );
};

export default Register;
