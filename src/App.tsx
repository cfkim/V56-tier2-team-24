// src/App.tsx
import { Routes, Route } from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";
import ResetLinkSent from "./pages/ResetLinkSent";
import Footer from "./components/footer";

function App() {
  return (
    <>
      <Routes>
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset-link-sent" element={<ResetLinkSent />} />
        <Route path="/" element={<ForgotPassword />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;