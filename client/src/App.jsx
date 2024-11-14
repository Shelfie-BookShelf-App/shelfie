import { useRoutes } from "react-router-dom";
import { useState, useEffect } from "react";

import "./App.css";
import GoogleBooks from "./components/GoogleBooks";
import UserProfile from "./pages/UserProfile";
import Login from "./pages/Login.jsx";
import NavBar from "./components/header/NavBar";

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
      element: user && user.id ? <GoogleBooks /> : <Login api_url={API_URL}/>
    },
    {
      path: '/user/:userId',
      element: user && user.id ? <UserProfile user={user}/> : <Login api_url={API_URL}/>
    }
  ])

  return (
    user && user.id ?
      <div>
        <NavBar user={user}/>
        {element}
      </div>
    :
      <></>
  );
}

export default App;
