import React from "react";
import ProfileCard from "./ProfileCard";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate;
  const onLogout = () => {
    navigate("/login");
  };
  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow w-full">
      <h2 className="text-xl font-medium text-black px-2">Notes</h2>

      <ProfileCard onLogout={onLogout} />
    </div>
  );
};

export default Navbar;
