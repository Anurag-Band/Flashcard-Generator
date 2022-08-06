import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flashcards: localStorage.getItem("flashcards")
    ? JSON.parse(localStorage.getItem("flashcards"))
    : [],

  cardImageDetails: {},
};

export const flashcardSlice = createSlice({
  name: "flashcard",
  initialState,
  reducers: {
    setFlashCard(state, action) {
      state.flashcards.push({
        flashcards: action.payload,
      });
      localStorage.setItem("flashcards", JSON.stringify(state.flashcards));
    },

    setCardImage(state, { payload: { index, cardImage } }) {
      state.cardImageDetails = {
        index,
        cardImage,
      };
    },
  },
});

export const { setFlashCard, setCardImage } = flashcardSlice.actions;
export default flashcardSlice.reducer;
