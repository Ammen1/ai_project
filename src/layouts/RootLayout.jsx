import React from "react";
import Sidebar from "./sidebar/Index";

import Home from "../pages/Home";

import "../index.css";

function RootLayout({ children }) {
  return (
    <div className="flex w-full bg-black h-full">
      <Sidebar />
      <Home />
    </div>
  );
}

export default RootLayout;
