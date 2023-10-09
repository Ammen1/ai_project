import { useEffect, useState } from "react";
import { useRef } from "react";
import { motion } from "framer-motion";

// * React icons
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineAppstore } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { useMediaQuery } from "react-responsive";
import { MdMenu } from "react-icons/md";
import { NavLink, useLocation, useRoutes } from "react-router-dom";

import {
  BsFillArchiveFill,
  BsPeopleFill,
  BsFillGearFill,
} from "react-icons/bs";

const Sidebar = () => {
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const [open, setOpen] = useState(isTabletMid ? false : true);
  const sidebarRef = useRef();
  const { pathname } = useLocation();

  useEffect(() => {
    if (isTabletMid) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isTabletMid]);

  useEffect(() => {
    isTabletMid && setOpen(false);
  }, [pathname]);

  const Nav_animation = isTabletMid
    ? {
        open: {
          x: 0,
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          x: -250,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      }
    : {
        open: {
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          width: "4rem",
          transition: {
            damping: 40,
          },
        },
      };

  return (
    <div>
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 max-h-screen z-[998]  bg-black/50 ${
          open ? "block" : "hidden"
        } `}
      ></div>
      <motion.div
        ref={sidebarRef}
        variants={Nav_animation}
        initial={{ x: isTabletMid ? -250 : 0 }}
        animate={open ? "open" : "closed"}
        className=" bg-black text-black mt-24  shadow-xl z-[999] max-w-[15rem]  w-[15rem]
            overflow-hidden md:relative fixed
         h-screen border-r-4 "
      >
        <div className="flex flex-col ml-1 mr-50 bg-slate-950 h-full">
          <ul className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col   font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100   md:h-[68] h-[70]">
            <li className="sidebar-list-item mt-3">
              <NavLink to={"/"} className="link ">
                <AiOutlineAppstore
                  size={20}
                  className=" min-w-max hover:animate-pulse items-left text-white"
                />
                <h1 className="text-lx text-white font-bold">All Apps</h1>
              </NavLink>
            </li>

            <li className="sidebar-list-item">
              <NavLink to={"/register"} className="link mt-12 ">
                <BsPeopleFill
                  size={15}
                  className="min-w-max hover:animate-pulse items-left text-white"
                />
                <h1 className=" text-white text-lx mr-6">Farmer</h1>
              </NavLink>
            </li>
            <li className="sidebar-list-item">
              <NavLink to={"/stroage"} className="link">
                <BsFillArchiveFill
                  size={20}
                  className="min-w-max  hover:animate-pulse text-white "
                />
                <h1 className="text-white text-lx mr-6  font-bold">
                  Uploaad image
                </h1>
              </NavLink>
            </li>

            <li className="sidebar-list-item">
              <NavLink to={"/logout"} className="link ">
                <BsPerson
                  size={20}
                  className="icon min-w-max hover:animate-pulse items-left font-bold text-white"
                />
                <h1 className="text-white text-lx mr-10  font-bold">logout</h1>
              </NavLink>
            </li>

            <li className="sidebar-list-item">
              <NavLink to={"/settting"} className="link ">
                <BsFillGearFill
                  size={20}
                  className="icon min-w-max hover:animate-pulse items-left text-white"
                />
                <h1 className="text-white text-lx mr-10  font-bold">Result</h1>
              </NavLink>
            </li>
          </ul>
        </div>
        <motion.div
          onClick={() => {
            setOpen(!open);
          }}
          animate={
            open
              ? {
                  x: 10,
                  y: 10,
                  rotate: 0,
                }
              : {
                  x: -10,
                  y: -200,
                  rotate: 180,
                }
          }
          transition={{ duration: 0 }}
          className="absolute w-fit  h-fit md:block z-50 hidden right-3 bottom-3 cursor-pointer"
        >
          <div className=" m-2 text-white font-bold ">
            <IoIosArrowBack size={30} />
          </div>
        </motion.div>
      </motion.div>
      <div className="m-3 md:hidden  " onClick={() => setOpen(true)}>
        <MdMenu size={20} />
      </div>
    </div>
  );
};

export default Sidebar;
