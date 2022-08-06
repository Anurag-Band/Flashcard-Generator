import React from "react";
import { useNavigate } from "react-router-dom";

const MySingleFlashCard = ({
  id,
  groupName,
  groupDescription,
  Card,
  groupImage,
}) => {
  let navigate = useNavigate();

  return (
    <div
      key={id}
      className="p-6 m-4 flex flex-col space-y-4 items-center justify-center bg-white rounded-md text-black w-[23rem] h-[15rem] relative border-2 border-slate-200"
    >
      <div className="absolute -top-10">
        {groupImage && (
          <img
            className="rounded-full w-20 h-20 object-cover aspect-square"
            src={groupImage.secure_url}
            alt="groupImage"
          />
        )}
      </div>
      <h2 className="font-bold text-lg">{groupName}</h2>
      <p className="text-center font-medium text-sm text-slate-600 line-clamp-2">
        {groupDescription}
      </p>
      <p className="font-medium text-sm text-slate-700">
        {Card ? Card.length : 0} Cards
      </p>
      <button
        onClick={() => navigate(`/flashcarddetails/${id}`)}
        className="py-1 px-16 text-red-600 font-bold rounded-sm border-red-600 ring-2 ring-red-600"
      >
        View Cards
      </button>
    </div>
  );
};

export default MySingleFlashCard;
