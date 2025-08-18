import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import Chatbot from "./components/Chatbot";
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
import { useAuthActions, useIsLoggedIn, useRole } from "./stores/authStore";

function App() {
  const [showChatbot, setShowChatbot] = useState(false);
  const location = useLocation();

  const navigate = useNavigate();
  setNavigate(navigate);

  const { setIsLoggedIn, setRole, setUser } = useAuthActions();
  const role = useRole();
  const isLoggedIn = useIsLoggedIn();

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
      {showChatbot && (
        <div className="fixed inset-0 z-75 bg-black opacity-50 md:hidden lg:hidden"></div>
      )}

      <Header />
      <main className="font-nunito relative flex-1">
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
        <div className="absolute right-0 bottom-0 z-100 md:pr-5">
          {showChatbot && (
            <div className="flex flex-col gap-2 px-5 md:w-[600px]">
              <Chatbot
                currentPage={location.pathname}
                role={isLoggedIn && role ? role : "not logged in"}
              />
              <div className="flex justify-end">
                <button
                  className="bg-accent flex h-10 w-10 items-center justify-center rounded-full hover:cursor-pointer md:h-15 md:w-15"
                  onClick={() => setShowChatbot(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    fill="#000000"
                    className="h-4 w-4 md:h-10 md:w-10"
                  >
                    <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {!showChatbot && (
        <button
          className="bg-accent absolute right-0 bottom-30 z-100 flex h-15 w-15 items-center justify-center rounded-l-2xl hover:cursor-pointer md:h-30 md:w-30"
          onClick={() => setShowChatbot(!showChatbot)}
        >
          <svg
            className="h-8 w-8 md:h-18 md:w-18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_4418_5763)">
              <path
                d="M8.5 19H8C4 19 2 18 2 13V8C2 4 4 2 8 2H16C20 2 22 4 22 8V13C22 17 20 19 16 19H15.5C15.19 19 14.89 19.15 14.7 19.4L13.2 21.4C12.54 22.28 11.46 22.28 10.8 21.4L9.3 19.4C9.14 19.18 8.77 19 8.5 19Z"
                stroke="#1c0000"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                opacity="0.4"
                d="M15.9965 11H16.0054"
                stroke="#1c0000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                opacity="0.4"
                d="M11.9955 11H12.0045"
                stroke="#1c0000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                opacity="0.4"
                d="M7.99451 11H8.00349"
                stroke="#1c0000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_4418_5763">
                <rect width="30" height="30" fill="none" />
              </clipPath>
            </defs>
          </svg>
        </button>
      )}
      <Footer />
    </>
  );
}

export default App;
