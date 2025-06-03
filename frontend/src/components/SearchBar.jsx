import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="w-[45%] border-black border-2 px-1 rounded-md flex justify-between items-center">
      <input
        type="text"
        placeholder="Search Notes"
        className="w-full py-1.5 outline-none"
        value={value}
        onChange={onChange}
      />
      <div className="flex items-center gap-2">
        {value && <IoMdClose size={22} onClick={onClearSearch } />}
        <FaMagnifyingGlass className="hover:text-black text-slate-400 cursor-pointer" 
        onClick={handleSearch}
        />
      </div>
    </div>
  );
};

export default SearchBar;