import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MySingleFlashCard from "./MySingleFlashCard";

const MyFlashCard = () => {
  const navigate = useNavigate();

  const { flashcards: flashcard } = useSelector((state) => state.flashcard);

  const [showAll, setShowAll] = useState(false);

  const showLimit = !showAll ? 6 : flashcard.length;

  return (
    <section className="flex flex-col mt-16">
      {flashcard.length > 0 ? (
        <div className="flex flex-wrap">
          {flashcard.slice(0, showLimit).map((card, i) => (
            <MySingleFlashCard
              key={i}
              id={card.flashcards.id}
              groupName={card.flashcards.groupName}
              groupDescription={card.flashcards.groupDescription}
              Card={card.flashcards.Card}
              groupImage={card.flashcards.groupImage}
            />
          ))}
          <button
            className="ml-[69rem] w-16 mt-1 font-semibold text-lg text-red-600 outline-none border-none active:outline-none active:border-none"
            onClick={() => setShowAll(!showAll)}
          >
            See all
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center bg-white shadow-lg p-20">
          <h1 className="font-semibold text-2xl text-slate-500">
            Nothing to SHOW, Go to{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => navigate("/")}
            >
              Create Flashcard
            </span>
            to Create New
          </h1>
        </div>
      )}
    </section>
  );
};

export default MyFlashCard;
