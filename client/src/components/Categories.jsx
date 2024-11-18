import { useDispatch, useSelector } from "react-redux";
import {
  setFilteredGoogleBooks,
  setSelectedCategory,
} from "../features/books/booksSlice";
import { Button, Box } from "@mui/material";
import { useEffect } from "react";

const categories = [
  "Fiction",
  "Science",
  "Arts",
  "Business",
  "Cooking",
  "Biography",
  "Self-Help",
  "Health",
  "Technology",
  "Collections",
  "Others",
  "All",
];

export default function Categories() {
  const { selectedCategory, googleBooks, filteredGoogleBooks } = useSelector((state) => state.books);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setFilteredGoogleBooks());
  }, [googleBooks, selectedCategory, dispatch]);

  const handleSelectedCategory = (category) => {
    dispatch(setSelectedCategory(category));
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
        {categories.map((category, index) => (
          <Button
            key={index}
            variant={selectedCategory === category ? "contained" : "outlined"}
            onClick={() => handleSelectedCategory(category)}
            sx={{
              textTransform: "capitalize",
              borderColor: "black",
              color: selectedCategory === category ? "white" : "black",
              backgroundColor: selectedCategory === category ? "black" : "white",
              "&:hover": {
                backgroundColor: selectedCategory === category ? "grey.700" : "grey.300",
              },
              "&.MuiButton-root": {
                outline: "none", // Remove blue focus ring
              },
            }}
          >
            {category}
          </Button>
        ))}
      </Box>
      <Box mt={4}>
        {filteredGoogleBooks.length === 0 ? (
          <Box color="grey" textAlign="center">
            No books available
          </Box>
        ) : (
          <Box textAlign="center" color="black">
            {filteredGoogleBooks.length} books found
          </Box>
        )}
      </Box>
    </Box>
  );
}
