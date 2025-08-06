// src/App.tsx
import { Routes, Route } from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";
import ResetLinkSent from "./pages/ResetLinkSent";
import ResetPassword from "./pages/ResetPassword";
import ResetPasswordSuccess from "./pages/ResetPasswordSuccess";
import Footer from "./components/footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col">
        <Routes>
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset-link-sent" element={<ResetLinkSent />} />
          <Route path="/password/reset" element={<ResetPassword />} />
          <Route path="/password/reset-success" element={<ResetPasswordSuccess />} />
          <Route path="/" element={<ForgotPassword />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;