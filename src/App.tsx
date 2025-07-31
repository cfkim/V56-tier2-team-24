<<<<<<< HEAD
import { Route, Routes, useNavigate } from "react-router-dom";
import Footer from "./components/footer";
import Hero from "./components/hero";
import Login from "./pages/Login";
import Account from "./pages/Account";
import { setNavigate } from "./lib/navigation";
function App() {
  const navigate = useNavigate()
  setNavigate(navigate)
  return (
    <Routes>
      <Route path="/" element={<Hero />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/user" element={<Account />}></Route>
    </Routes>
  )
=======
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import type { Role } from "./types/Role";

function App() {
    const [role, setRole] = useState<Role | undefined>("admin");
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
    return (
        <BrowserRouter>
            <Header role={role} isLoggedIn={isLoggedIn} />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </main>
            <Footer />
        </BrowserRouter>
    );
>>>>>>> 8c8715c8266f7a30c2d45ab54d9954254776f357
}

export default App;
