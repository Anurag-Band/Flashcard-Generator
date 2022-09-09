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
      state.flashcards.push(action.payload);
      localStorage.setItem("flashcards", JSON.stringify(state.flashcards));
    },
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const { setFlashCard } = flashcardSlice.actions;

export const cardById = (state, groupId) =>
  state.flashcard.flashcards.filter((c) => c.groupid === groupId);

export default flashcardSlice.reducer;
