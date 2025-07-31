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
    const navigate = useNavigate()
    setNavigate(navigate)

    const [role, setRole] = useState<Role | undefined>("admin");
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
    return (
        <>
            <Header role={role} isLoggedIn={isLoggedIn} />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/user" element={<Account />} />
                </Routes>
            </main>
            <Footer />
        </>
    );
}

export default App;
