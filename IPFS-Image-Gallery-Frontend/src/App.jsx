import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './Components/Login'
import './App.css'
import Register from './Components/Register'
import Gallery from './Components/Gallery'
import 'bootstrap/dist/css/bootstrap.min.css';
import GalleryV2 from './Components/GalleryV2'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("loggedIn") === 'true' && sessionStorage.getItem("userId") !== null) {
      setIsLoggedIn(true);
      setUsername(sessionStorage.getItem("userId"))
    }
    else if (sessionStorage.getItem("loggedIn") === 'false') {
      setIsLoggedIn(false);
      setUsername("");
    }
  }, [])

  const logout = () => {
    setIsLoggedIn(false);
    sessionStorage.setItem("loggedIn", false);
    sessionStorage.removeItem("userId");
  }

  const login = (e) => {
    setIsLoggedIn(true);
    setUsername(e);
    sessionStorage.setItem("loggedIn", true);
    sessionStorage.setItem("userId", e);
  }
  console.log(isLoggedIn);
  // console.log(username);

  return (
    <>
      <Routes>
        {/* <Route path="/gallery" element={<Gallery />} />
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />} />
        <Route path="/register" element={<Register />} /> */}
        {isLoggedIn ? (
          // <Route path="/" element={<Gallery isLoggedIn={isLoggedIn} logout={logout} username={username} />} />
          <Route path="/" element={<GalleryV2 isLoggedIn={isLoggedIn} logout={logout} username={username} />} />
        ) : (
          <>
            <Route path="/" element={<Login login={login} logout={logout} />} />
            <Route path="/register" element={<Register />} />
          </>
        )}
      </Routes>
    </>

  )
}

export default App;
