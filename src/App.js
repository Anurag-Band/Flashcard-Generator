import React from "react";
import "./App.css";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   increment,
//   decrement,
//   resetValue,
//   incrementByAmount,
// } from "./features/flashcard/flashcardSlice";

import { Routes, Route } from "react-router-dom";

import CreateFlashCard from "./components/CreateFlashCard";
import MyFlashCard from "./components/MyFlashCard";
import FlashCardDetails from "./components/FlashCardDetails";
import HomePage from "./pages/HomePage";

function App() {
  // const count = useSelector((state) => state.flashcard.value);
  // const dispatch = useDispatch();

  return (
    <div className="w-full min-h-screen bg-[#f8f4ef] font-Montserrat">
      <div className="p-3 lg:px-36 container mx-auto">
        <HomePage />
        <Routes>
          <Route path="/" element={<CreateFlashCard />} />
          <Route path="/myflashcard" element={<MyFlashCard />} />
          <Route
            path="/flashcarddetails/:cardid"
            element={<FlashCardDetails />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
