import BookSlider from "../components/BookSlider";
import Categories from "../components/Categories";
import GoogleBooks from "../components/GoogleBooks";
import Sidebar from "../components/Sidebar";

export default function Search({api_url}) {
  return (
    <div>
      <Categories />
      <BookSlider />
      <div className="flex">
        <Sidebar />
        <GoogleBooks api_url={api_url}/>
      </div>
    </div>
  );
}
