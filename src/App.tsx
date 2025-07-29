import { Route, Routes } from "react-router-dom";
import Footer from "./components/footer";
import Hero from "./components/hero";
import Login from "./pages/Login";
import Account from "./pages/Account";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Account />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/user" element={<Account />}></Route>
    </Routes>
  )
}

export default App;
