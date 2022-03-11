import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard, Login, Register } from "./pages";
import { Header } from "./components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Routes>
        </div>
      </Router>
      {/* <ToastContainer /> */}
    </>
  );
}

export default App;
