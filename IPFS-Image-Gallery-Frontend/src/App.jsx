import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './Components/Login'
import './App.css'
import Register from './Components/Register'
import Gallery from './Components/Gallery'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const logout = () => {
    setIsLoggedIn(false);
    sessionStorage.setItem("loggedIn", false);
  }

  const login = () =>{
    setIsLoggedIn(true);
    sessionStorage.setItem("loggedIn", true);
  }
  console.log(isLoggedIn);
  // console.log(username);

  return (
    <>
      <Routes>
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />} />
        <Route path="/register" element={<Register />} />
        {/* {isLoggedIn ? (
          <Route path="/" element={<Gallery isLoggedIn={isLoggedIn} logout={logout}/>} />
        ) : (
          <>
            <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />} />
            <Route path="/register" element={<Register />} />
          </>
        )} */}
      </Routes>
    </>

  )
}

export default App;
