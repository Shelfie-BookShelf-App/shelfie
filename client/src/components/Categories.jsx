import { useDispatch, useSelector } from "react-redux";
import {
  setFilteredGoogleBooks,
  setSelectedCategory,
} from "../features/books/booksSlice";

const categories = [
  "Fiction",
  "Science",
  "Arts",
  "Business & Economics",
  "Cooking",
  "Biography",
  "Self-Help",
  "Collections",
  "All",
];

export default function Categories() {
  const { selectedCategory } = useSelector((state) => state.books);
  const dispatch = useDispatch();

  const handleSelectedCategory = (category) => {
    dispatch(setSelectedCategory(category));
    dispatch(setFilteredGoogleBooks());
  };

  return (
    <ul className="flex justify-center items-center gap-10">
      {categories.map((category, index) => (
        <li key={index} onClick={() => handleSelectedCategory(category)}>
          {category}
        </li>
      ))}
    </ul>
  );
}
