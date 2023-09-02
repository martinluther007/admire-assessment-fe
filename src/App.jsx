import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import GlobalContexts from "./contexts/GlobalContexts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <GlobalContexts>
      <ToastContainer className="toast" />

      <Router>
        <Routes>
          <Route path="/signup" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </GlobalContexts>
  );
}

export default App;
