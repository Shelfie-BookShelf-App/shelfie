import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  googleBooks: [],
  filteredGoogleBooks: [],
  favoriteBooks: [],
  selectedCategory: "",
  searchQuery: "bestsellers",
};

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setGoogleBooks: (state, action) => {
      state.googleBooks = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setFilteredGoogleBooks: (state) => {
      const filteredBooksByCategory =
        !state.selectedCategory || state.selectedCategory === "All"
          ? state.googleBooks
          : state.googleBooks.filter((book) =>
              book?.volumeInfo?.categories?.some((category) =>
                category
                  .toLowerCase()
                  .includes(state.selectedCategory.toLowerCase())
              )
            );
      state.filteredGoogleBooks = filteredBooksByCategory;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  setGoogleBooks,
  setSelectedCategory,
  setFilteredGoogleBooks,
  setSearchQuery,
} = booksSlice.actions;

export default booksSlice.reducer;
