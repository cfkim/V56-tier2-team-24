import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import type { Role } from "./types/Role";
import Login from "./pages/Login";
import Account from "./pages/Account";
import { setNavigate } from "./lib/navigation";
import { getUser } from "./lib/api";

function App() {
  const [role, setRole] = useState<Role | undefined>("admin");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState()

  const navigate = useNavigate()
  setNavigate(navigate)

    useEffect(() => {
      console.log("refresjed! edje")
      
      const fetchUser = async () => {
        try {
            const user = await getUser();
            setIsLoggedIn(true);
        }catch(err){
            console.log("oops")
            setIsLoggedIn(false)
        }
      }

      fetchUser();
    }, [])
  return (
   <>
      <Header
        role={role}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setUser={setUser}
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
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setRole={setRole} setUser={setUser}/>} />
            <Route path="/user" element={<Account />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
