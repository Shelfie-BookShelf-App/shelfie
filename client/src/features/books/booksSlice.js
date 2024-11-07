import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  googleBooks: [],
  favoriteBooks: [],
};

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setGoogleBooks: (state, action) => {
      console.log(action.payload);
      return { ...state, googleBooks: action.payload };
    },
  },
});

export const { setGoogleBooks } = booksSlice.actions;

export default booksSlice.reducer;
