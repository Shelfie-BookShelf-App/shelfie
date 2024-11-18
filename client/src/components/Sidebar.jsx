import CheckedCategories from "./CheckedCategories";
import Searchbar from "./Searchbar";

const popularBooks = [
  {
    label: "Memory Books",
    value: "memory books",
  },
  {
    label: "Novels",
    value: "novels",
  },
  {
    label: "Story Books",
    value: "story books",
  },
  {
    label: "Poetry Books",
    value: "poetry books",
  },
  {
    label: "Biography Books",
    value: "biography books",
  },
  {
    label: "Religious Books",
    value: "religious books",
  },
  {
    label: "Knowledge Books",
    value: "knowledge books",
  },
  {
    label: "Children's Books",
    value: "children's books",
  },
];

const newBooksCategories = [
  {
    label: "Memory Books",
    value: "memory books",
  },
  {
    label: "Novels",
    value: "novels",
  },
  {
    label: "Story Books",
    value: "story books",
  },
  {
    label: "Poetry Books",
    value: "poetry books",
  },
  {
    label: "Biography Books",
    value: "biography books",
  },
  {
    label: "Religious Books",
    value: "religious books",
  },
  {
    label: "Knowledge Books",
    value: "knowledge books",
  },
  {
    label: "Children's Books",
    value: "children's books",
  },
];

export default function Sidebar() {
  return (
    <div className="flex flex-col gap-4">
      <Searchbar>Search categories...</Searchbar>
      <CheckedCategories options={popularBooks}>
        Popular Categories
      </CheckedCategories>
      <CheckedCategories options={newBooksCategories}>
        New Books Categories
      </CheckedCategories>
    </div>
  );
}
