import React, { useState } from "react";
import ProfileCard from "./ProfileCard";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const navigate = useNavigate;

  const [query, setQuery] = useState("");
  const onLogout = () => {
    navigate("/login");
  };

  const handleSearch = () => {};

  const onClearSearch = () => {
    setQuery("");
  };

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow w-full">
      <h2 className="text-xl font-medium text-black px-2">Notes</h2>

      <SearchBar
        value={query}
        onChange={({ target }) => {
          setQuery(target.value);
        }}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />
      <ProfileCard onLogout={onLogout} />
    </div>
  );
};

export default Navbar;
