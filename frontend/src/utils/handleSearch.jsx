import React, { useState, useEffect } from "react";

const handleSearch = (e,setFilteredQuestions,user) => {
  

  return (
    <>
      <input
        type="text"
        placeholder="Search questions..."
        className="px-5 py-3 w-full sm:w-1/2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        // onChange={handleSearch}
      />
    </>
  );
};

export default handleSearch
