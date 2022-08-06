import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RiArrowGoBackLine } from "react-icons/ri";
import { IoDownloadOutline, IoPrintOutline } from "react-icons/io5";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import ShareModal from "./ShareModal";

const FlashCardDetails = () => {
  let [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }
  // ------------------
  const navigate = useNavigate();

  const { cardid } = useParams();
  // console.log(cardid);

  const flashcard = useSelector((state) => state.flashcard.flashcards);

  const [cardDetails, setCardDetails] = useState({});
  const [singleCardDetail, setSingleCardDetail] = useState({});
  // console.log(cardDetails);

  useEffect(() => {
    const card = flashcard.find((c) => c.flashcards.id === cardid);

    setCardDetails(card.flashcards);
    // console.log(card.flashcards);

    setSingleCardDetail(card.flashcards.Card[0]);

    // eslint-disable-next-line
  }, [cardid]);

  const displayCard = (id) => {
    const showSingleCard = cardDetails.Card.find((c) => c.id === id);
    setSingleCardDetail(showSingleCard);
  };

  return (
    <section className="flex flex-col">
      <header className="flex">
        <BiArrowBack
          className="text-3xl text-slate-500 mr-6 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <div className="flex flex-col">
          <h2 className="text-xl font-bold">{cardDetails.groupName}</h2>
          {cardDetails.groupDescription && (
            <p className="text-slate-500 my-2">
              {cardDetails.groupDescription}
            </p>
          )}
        </div>
      </header>
      <main className="mt-6 grid grid-cols-4">
        <aside className="col-span-1 bg-white w-[17rem] px-1 py-2 h-fit rounded-md">
          <h2 className="p-2 text-slate-500">Flashcards</h2>
          <hr />
          <hr className="mb-2" />
          {cardDetails.Card &&
            cardDetails.Card.map((card) => (
              <p
                key={card.id}
                className="py-2 px-8 text-slate-700 font-medium hover:bg-slate-100 cursor-pointer"
                onClick={() => displayCard(card.id)}
              >
                {card.cardname}
              </p>
            ))}
        </aside>

        <section className="col-span-2 flex bg-white shadow-lg rounded-lg">
          {singleCardDetail.cardimage?.secure_url && (
            <div className="w-80 p-6 flex items-center">
              <img
                src={singleCardDetail.cardimage?.secure_url}
                alt="cardimage"
                className="object-contain"
              />
            </div>
          )}
          <p
            className={`${
              singleCardDetail.cardimage?.secure_url ? "w-1/2" : "w-full"
            } p-6 py-10 text-slate-500`}
          >
            {singleCardDetail.carddescription}
          </p>
        </section>
        <aside className="col-span-1 flex flex-col items-center space-y-5">
          <button
            onClick={openModal}
            className="flex items-center py-3 px-4 w-60 space-x-5 bg-white rounded-md shadow-lg active:scale-100 transition-all duration-100 hover:scale-105"
          >
            <RiArrowGoBackLine className="scale-x-[-1]" />
            <span>Share</span>
            <ShareModal isOpen={isOpen} closeModal={closeModal} />
          </button>
          <button className="flex items-center py-3 px-4 w-60 space-x-5 bg-white rounded-md shadow-lg active:scale-100 transition-all duration-100 hover:scale-105">
            <IoDownloadOutline />
            <span>Download</span>
          </button>
          <button className="flex items-center py-3 px-4 w-60 space-x-5 bg-white rounded-md shadow-lg active:scale-100 transition-all duration-100 hover:scale-105">
            <IoPrintOutline />
            <span>Print</span>
          </button>
        </aside>
      </main>
    </section>
  );
};

export default FlashCardDetails;
