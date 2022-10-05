import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flashcards: localStorage.getItem("flashcards")
    ? JSON.parse(localStorage.getItem("flashcards"))
    : [],
};

export const flashcardSlice = createSlice({
  name: "flashcard",
  initialState,
  reducers: {
    setFlashCard(state, action) {
      state.flashcards.push({
        card: action.payload,
      });
      localStorage.setItem("flashcards", JSON.stringify(state.flashcards));
    },
  },
});

export const { setFlashCard } = flashcardSlice.actions;

// export const cardById = (state, groupId) =>
//   state.flashcard.flashcards.filter((c) => c.groupid === groupId);

export default flashcardSlice.reducer;
