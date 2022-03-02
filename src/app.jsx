import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "containers/Home";
import NotFound from "containers/NotFound";
import SignUp from "containers/SignUp";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
