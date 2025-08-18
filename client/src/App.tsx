import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer";
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
import type { User } from "./types/LoginResponse";
import type { Role } from "./types/Role";
import Chatbot from "./components/Chatbot";

function App() {
  const [role, setRole] = useState<Role | undefined>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User>();
  const [showChatbot, setShowChatbot] = useState(false);
  const location = useLocation() 
  

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
    if (window.localStorage.getItem("accessToken") == null) {
      setIsLoggedIn(true);
      setRole("guest");
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
      {showChatbot && (<div className="bg-black opacity-50 fixed inset-0 z-75 md:hidden lg:hidden"></div>)}
      
      <Header
        role={role}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setUser={setUser}
      />
      <main className="font-nunito flex-1 relative">
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

          {/* <Route path="/user" element={<Account user={user} />} /> */}
          <Route path="/status" element={<Status />} />

          <Route
            path="/info"
            element={
              <ProtectedRoute
                isAllowed={role === "admin"}
                isLoggedIn={isLoggedIn}
              >
                <PatientInfo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update"
            element={
              <ProtectedRoute
                isAllowed={role === "admin" || role === "surgeon"}
                isLoggedIn={isLoggedIn}
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
          <Route path="/not-allowed" element={<NotAllowed role={role} />} />
          <Route
            path="*"
            element={
              <Home
                role={role}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                setRole={setRole}
              />
            }
          />
        </Routes>
        <div className="absolute z-100 bottom-0 right-0 md:pr-5">
          {showChatbot && (
            <div className="flex flex-col md:w-[600px] gap-2 px-5">
              <Chatbot currentPage={location.pathname} role={isLoggedIn && role ? role : "not logged in"}></Chatbot>
              <div className="flex justify-end">
                <button className="h-10 w-10 md:h-15 md:w-15 rounded-full bg-accent flex justify-center items-center hover:cursor-pointer" onClick={() => setShowChatbot(false)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#000000" className="h-4 w-4 md:h-10 md:w-10">
                  <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>
                </button>
              </div>
              
            </div>
          )}
        </div>
      </main>
      
      {!showChatbot &&
        (
          <button className="h-15 w-15 md:h-30 md:w-30 flex items-center justify-center bg-accent rounded-l-2xl hover:cursor-pointer absolute z-100 right-0 bottom-30" onClick={() => setShowChatbot(!showChatbot)}>
            <svg className="h-8 w-8 md:h-18 md:w-18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_4418_5763)">
              <path d="M8.5 19H8C4 19 2 18 2 13V8C2 4 4 2 8 2H16C20 2 22 4 22 8V13C22 17 20 19 16 19H15.5C15.19 19 14.89 19.15 14.7 19.4L13.2 21.4C12.54 22.28 11.46 22.28 10.8 21.4L9.3 19.4C9.14 19.18 8.77 19 8.5 19Z" stroke="#1c0000" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              <path opacity="0.4" d="M15.9965 11H16.0054" stroke="#1c0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path opacity="0.4" d="M11.9955 11H12.0045" stroke="#1c0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path opacity="0.4" d="M7.99451 11H8.00349" stroke="#1c0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
              <defs>
              <clipPath id="clip0_4418_5763">
              <rect width="30" height="30" fill="none"/>
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
