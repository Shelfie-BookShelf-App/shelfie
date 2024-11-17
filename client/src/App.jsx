import "./App.css";
import Header from "./sections/Header";
import Footer from "./sections/Footer";
import Home from "./pages/Home";
import Search from "./pages/Search";

function App() {
  return (
    <div className="prose lg:prose-lg max-w-[1440px] m-auto w-full h-full min-h-screen scroll-smooth">
      <Header />
      <div className="mt-24">
        <Home />
        {/* <Search /> */}
      </div>
      <Footer />
    </div>
  );
}

export default App;
