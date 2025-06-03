import React, { useState } from "react";
import ProfileCard from "./ProfileCard";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

const Navbar = ({ userInfo, searchNote, onClearSearch }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => {
    if (query.trim()) {
      searchNote(query.trim());
    }
  };

  const handleClearSearch = () => {
    setQuery("");
    onClearSearch();
  };

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow w-full">
      <h2 className="text-xl font-medium text-black px-2">NoteVault</h2>

      <SearchBar
        value={query}
        onChange={({ target }) => setQuery(target.value)}
        handleSearch={handleSearch}
        onClearSearch={handleClearSearch}
      />
      <ProfileCard onLogout={onLogout} userInfo={userInfo} />
    </div>
  );
};

export default Navbar;
