import { useState } from "react";

import { close, ai_logo, menu, f } from "../assets";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="fixed-navbar w-full bg-gray-950 flex rounded-[20] py-4  items-center">
      <NavLink to={"/"} className="link items-start ">
        <img
          src={ai_logo}
          alt="AI"
          className="w-[60px] ml-6 rounded-full   h-[60px]"
        />
      </NavLink>

      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        <li>
          <NavLink to={"/login"} className="link ">
            <h1 className="text-lx text-cyan-500 text-lg mr-8  font-bold">
              Login
            </h1>
          </NavLink>
        </li>
      </ul>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            <NavLink to={"/register"} className="link hover:animate-bounce ">
              <h1 className="text-lx text-cyan-500 text-lg mr-0  font-bold">
                SingUp
              </h1>
            </NavLink>
            <NavLink to={"/logout"} className="link ">
              <h1 className="text-lx text-cyan-500 text-lg mr-8  font-bold">
                Login
              </h1>
            </NavLink>
            <NavLink to={"/login"} className="link ">
              <h1 className="text-lx text-cyan-500 text-lg mr-8  font-bold">
                Logout
              </h1>
            </NavLink>
          </ul>
        </div>
      </div>
      <div className="absolute z-[0] w-[50%] h-[50%] bg-y right-20 bottom-20 blue__gradient" />
    </nav>
  );
};

export default Navbar;
