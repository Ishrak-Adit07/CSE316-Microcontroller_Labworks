/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";

import Register from "./pages/user/Register";
import Livescore from "./pages/user/Livescore";
import Finalscore from "./pages/user/Finalscore";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Register />} />

          <Route path="register" element={<Register />} />
          <Route path="livescore" element={<Livescore />} />
          <Route path="finalscore" element={<Finalscore />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
