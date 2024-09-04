/* eslint-disable no-unused-vars */
import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <main className="pt-16 items-center w-full h-full">
        {/* <div className="fog-background"></div> */}
        <div className="relative z-10">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default Layout;
