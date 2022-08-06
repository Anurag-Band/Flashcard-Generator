import { configureStore } from "@reduxjs/toolkit";
import flashcardReducer from "../features/flashcard/flashcardSlice";

export const store = configureStore({
  reducer: {
    flashcard: flashcardReducer,
  },
});
