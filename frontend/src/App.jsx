import React from "react";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Hero from "./pages/Hero";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" exact element={<Home />} />
        <Route path="/" exact element={<Hero />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/signup" exact element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
