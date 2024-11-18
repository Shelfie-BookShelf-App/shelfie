import { useEffect, useState } from 'react';
import { useRoutes } from 'react-router-dom';

import "./App.css";
import Header from "./sections/Header";
import Footer from "./sections/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Search from "./pages/Search";
import Saved_Books from './pages/Saved_Books';

function App() {
  const [user, setUser] = useState(null)
  const API_URL = 'http://localhost:3001'

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(`${API_URL}/auth/login/success`, { credentials: 'include' })
      const json = await response.json()
      setUser(json.user)

      console.log(json.user)
    }

    getUser()
  }, [])

  let element = useRoutes([
    {
      path: '/',
      element: user && user.id ? <Home /> : <Login api_url={API_URL}/>
    },
    {
      path: '/search',
      element: user && user.id ? <Search /> : <Login api_url={API_URL}/>
    },
    {
      path: '/saved_books',
      element: user && user.id ? <Saved_Books /> : <Login api_url={API_URL}/>
    }

  ])

  return (
    <div className="prose lg:prose-lg max-w-[1440px] m-auto w-full h-full min-h-screen scroll-smooth">
      <Header user={user} api_url={API_URL}/>
      <div className="mt-24">
        {element}
      </div>
      <Footer />
    </div>
  );
}

export default App;
