/* eslint-disable no-unused-vars */
import React, {} from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {

  return (
    <>

      <main className="pt-16 items-center w-full h-full">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;