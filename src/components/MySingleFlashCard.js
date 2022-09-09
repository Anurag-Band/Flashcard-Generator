import React from "react";
import { useNavigate } from "react-router-dom";

const MySingleFlashCard = ({ flashcard }) => {
  const navigate = useNavigate();

  return (
    <div
      key={flashcard.groupid}
      className="p-6 m-4 flex flex-col space-y-4 items-center justify-center bg-white rounded-md text-black w-[23rem] h-[15rem] relative border-2 border-slate-200"
    >
      <div className="absolute -top-10">
        <img
          className="rounded-full w-20 h-20 object-cover aspect-square"
          src={flashcard.groupimg}
          alt={flashcard.groupname}
        />
      </div>
      <h2 className="font-bold text-lg">{flashcard.groupname}</h2>
      <p className="text-center font-medium text-sm text-slate-600 line-clamp-2">
        {flashcard.groupdescription}
      </p>
      <p className="font-medium text-sm text-slate-700">
        {flashcard.cards ? flashcard.cards.length : 0} Cards
      </p>
      <button
        onClick={() => navigate(`/flashcarddetails/${flashcard.groupid}`)}
        className="py-1 px-16 text-red-600 font-bold rounded-sm border-red-600 ring-2 ring-red-600"
      >
        View Cards
      </button>
    </div>
  );
};

export default MySingleFlashCard;
