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
    <div className="bg-white/95 backdrop-blur-lg border-b border-gray-200/50 shadow-lg shadow-purple-100/20 sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center shadow-lg">
            <svg
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            NoteVault
          </h2>
        </div>

        {/* Search Section */}
        <div className="flex-1 max-w-md mx-8">
          <SearchBar
            value={query}
            onChange={({ target }) => setQuery(target.value)}
            handleSearch={handleSearch}
            onClearSearch={handleClearSearch}
          />
        </div>

        {/* Profile Section */}
        <div className="flex items-center">
          <ProfileCard onLogout={onLogout} userInfo={userInfo} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
