import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer";
import Header from "./components/Header";
import { getUser } from "./lib/api";
import { setNavigate } from "./lib/navigation";
import Account from "./pages/Account";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PatientInfo from "./pages/PatientInfo";
import Status from "./pages/PatientStatus";
import ResetLinkSent from "./pages/ResetLinkSent";
import ResetPassword from "./pages/ResetPassword";
import ResetPasswordSuccess from "./pages/ResetPasswordSuccess";
import UpdateStatus from "./pages/UpdateStatus";
import type { User } from "./types/LoginResponse";
import type { Role } from "./types/Role";

function App() {
  const [role, setRole] = useState<Role | undefined>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User>();

  const navigate = useNavigate();
  setNavigate(navigate);

  useEffect(() => {
    // Skip authentication check for password reset pages
    const currentPath = window.location.pathname;
    if (currentPath.startsWith("/password/")) {
      setIsLoggedIn(false);
      return;
    }
    
    // Skip authentication if no token is found. Becomes a guest.
    if(window.localStorage.getItem("accessToken") == null){
      setIsLoggedIn(true);
      setRole("guest")
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await getUser();
        setUser(response.data.user);
        setRole(response.data.user.role);
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
          <Route path="/status" element={<Status />} />
          <Route path="/info" element={<PatientInfo />} />
          <Route path="/update" element={<UpdateStatus />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset-link-sent" element={<ResetLinkSent />} />
          <Route path="/password/reset" element={<ResetPassword />} />
          <Route
            path="/password/reset-success"
            element={<ResetPasswordSuccess />}
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
