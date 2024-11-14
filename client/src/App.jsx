import "./App.css";
import GoogleBooks from "./components/GoogleBooks";
import Header from "./components/Header";
import Home from "./pages/Home";

function App() {
  return (
    <div className="p-4">
      <Header />
      <Home />
    </div>
  );
}

export default App;
