import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="w-full">
      <div className="pt-12">
        <h1 className="text-3xl font-semibold pb-2">Create Flashcard</h1>
        <div className="flex items-center space-x-10 mb-8">
          <button className="text-lg font-bold text-red-600">
            <Link to={"/"}>Create New</Link>
          </button>
          <button className="text-lg font-bold text-red-600">
            <Link to={"/myflashcard"}>My Flashcard</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
