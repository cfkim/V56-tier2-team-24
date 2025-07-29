import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import type { Role } from "./types/Role";

function App() {
  const [role, setRole] = useState<Role | undefined>("admin");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  return (
    <BrowserRouter>
      <Header role={role} isLoggedIn={isLoggedIn} />
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
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
