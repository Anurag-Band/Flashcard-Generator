import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RiArrowGoBackLine } from "react-icons/ri";
import { IoDownloadOutline, IoPrintOutline } from "react-icons/io5";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import ShareModal from "../components/ShareModal";
import { cardById } from "../features/flashcard/flashcardSlice";

const Flashcard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const { groupId } = useParams();
  const navigate = useNavigate();

  const card = useSelector((state) => cardById(state, groupId));

  const [singleCardDetail, setSingleCardDetail] = useState({});

  const displayCard = (id) => {
    const showSingleCard = card.cards.filter((c) => c.id === id);
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
          <h2 className="text-xl font-bold">{card.groupname}</h2>
          {card.groupdescription && (
            <p className="text-slate-500 my-2">{card.groupdescription}</p>
          )}
        </div>
      </header>
      <main className="mt-6 grid grid-cols-4">
        <aside className="col-span-1 bg-white w-[17rem] px-1 py-2 h-fit rounded-md">
          <h2 className="p-2 text-slate-500">Flashcards</h2>
          <hr />
          <hr className="mb-2" />
          {card.cards &&
            card.cards.map((card) => (
              <p
                key={card.cardid}
                className="py-2 px-8 text-slate-700 font-medium hover:bg-slate-100 cursor-pointer"
                onClick={() => displayCard(card.cardid)}
              >
                {card.cardname}
              </p>
            ))}
        </aside>

        <section className="col-span-2 flex bg-white shadow-lg rounded-lg">
          {/* {singleCardDetail.cardimage?.secure_url && (
            <div className="w-80 p-6 flex items-center">
              <img
                src={singleCardDetail.cardimage?.secure_url}
                alt="cardimage"
                className="object-contain"
              />
            </div>
          )} */}
          <p className={`w-full p-6 py-10 text-slate-500`}>
            {singleCardDetail.carddescription}
          </p>
        </section>
        <aside className="col-span-1 flex flex-col items-center space-y-5">
          <button
            type="button"
            onClick={openModal}
            className="flex items-center py-3 px-4 w-60 space-x-5 bg-white rounded-md shadow-lg active:scale-100 transition-all duration-100 hover:scale-105"
          >
            <RiArrowGoBackLine className="scale-x-[-1]" />
            <span>Share</span>
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
      <ShareModal isOpen={isOpen} closeModal={closeModal} />
    </section>
  );
};

export default Flashcard;
