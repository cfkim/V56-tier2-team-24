import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer";
import Header from "./components/Header";
import { getUser } from "./lib/api";
import { setNavigate } from "./lib/navigation";
import Account from "./pages/Account";
import Home from "./pages/Home";
import Login from "./pages/Login";
import type { User } from "./types/LoginResponse";
import type { Role } from "./types/Role";
import PatientStatus from "./pages/PatientStatus";
import PatientInfo from "./pages/PatientInfo";
import UpdateStatus from "./pages/UpdateStatus";

function App() {
  const [role, setRole] = useState<Role | undefined>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User>();

  const navigate = useNavigate();
  setNavigate(navigate);

  useEffect(() => {
    console.log("auth useEffect triggered!");

    const fetchUser = async () => {
      try {
        const user = await getUser();
        setUser(user.user);
        setRole(user.user.role);
        setIsLoggedIn(true);
      } catch (err) {
        console.log("auth failed to fetch data: ", err);
        setIsLoggedIn(false);
      }
    };

    fetchUser();
  }, []);

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
                setRole={setRole}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                setIsLoggedIn={setIsLoggedIn}
                setRole={setRole}
                setUser={setUser}
              />
            }
          />
          <Route path="/user" element={<Account user={user} />} />
          <Route path="/status" element={<PatientStatus />} />
          <Route path="/info" element={<PatientInfo />} />
          <Route path="/update" element={<UpdateStatus />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
