import React from "react";
import { IoSearch } from "react-icons/io5";
import { HiPlusCircle } from "react-icons/hi2";

const SearchBar = ({ modelOpen, filterContact }) => {
  
  return (
    <div className="flex gap-2">
      <div className="flex items-center relative flex-grow">
        <IoSearch className="text-white text-3xl absolute ml-1" />
        <input
          onChange={filterContact}
          type="text"
          className="bg-transparent border border-white flex-grow pl-10 h-10 rounded-lg text-white"
        />
      </div>
      <HiPlusCircle onClick={modelOpen} className="text-white text-5xl cursor-pointer" />
    </div>
  );
};

export default SearchBar;
