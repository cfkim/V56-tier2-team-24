import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import { getUser } from "./lib/api";
import { setNavigate } from "./lib/navigation";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotAllowed from "./pages/NotAllowed";
import PatientInfo from "./pages/PatientInfo";
import Status from "./pages/PatientStatus";
import ResetLinkSent from "./pages/ResetLinkSent";
import ResetPassword from "./pages/ResetPassword";
import ResetPasswordSuccess from "./pages/ResetPasswordSuccess";
import UpdateStatus from "./pages/UpdateStatus";
import { useAuthActions, useRole } from "./stores/authStore";

function App() {
  const navigate = useNavigate();
  setNavigate(navigate);

  const { setIsLoggedIn, setRole, setUser } = useAuthActions();
  const role = useRole();

  useEffect(() => {
    // Skip authentication check for password reset pages
    const currentPath = window.location.pathname;
    if (currentPath.startsWith("/password/")) {
      setIsLoggedIn(false);
      setRole(null);
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
        setRole(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <Header />
      <main className="font-nunito flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* <Route path="/user" element={<Account user={user} />} /> */}
          <Route path="/status" element={<Status />} />

          <Route
            path="/info"
            element={
              <ProtectedRoute isAllowed={role === "admin"}>
                <PatientInfo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update"
            element={
              <ProtectedRoute
                isAllowed={role === "admin" || role === "surgeon"}
              >
                <UpdateStatus />
              </ProtectedRoute>
            }
          />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset-link-sent" element={<ResetLinkSent />} />
          <Route path="/password/reset" element={<ResetPassword />} />
          <Route
            path="/password/reset-success"
            element={<ResetPasswordSuccess />}
          />
          <Route path="/not-allowed" element={<NotAllowed />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
