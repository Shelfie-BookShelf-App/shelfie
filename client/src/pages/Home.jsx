import BookSlider from "../components/BookSlider";
import Categories from "../components/Categories";
import GoogleBooks from "../components/GoogleBooks";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <div>
      <Categories />
      <BookSlider />
      <div className="flex">
        <Sidebar />
        <GoogleBooks />
      </div>
    </div>
  );
}
