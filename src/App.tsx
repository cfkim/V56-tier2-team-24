import { Route, Routes } from "react-router-dom";
import Footer from "./components/footer";
import Hero from "./components/hero";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
    // <>
    //   {/* <Footer></Footer> */}
    //   {/* <Hero></Hero> */}
    //   {/* <Login></Login> */}
    // </>
  );
}

export default App;
