import { useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import type { Role } from "./types/Role";
import Login from "./pages/Login";
import Account from "./pages/Account";
import { setNavigate } from "./lib/navigation";

function App() {
  const [role, setRole] = useState<Role | undefined>("admin");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  
  const navigate = useNavigate()
  setNavigate(navigate)

//   const setLoggedIn = (loggedIn:boolean) => {
//     setIsLoggedIn(loggedIn)
//   }

  return (
   <>
      <Header
        role={role}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                role={role}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setRole={setRole}/>} />
            <Route path="/user" element={<Account />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
