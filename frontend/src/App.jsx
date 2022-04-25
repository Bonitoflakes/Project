import { useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import PortfolioPage from "./pages/PortfolioPage";
import { AuthContext } from "./contexts/authContext";
import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SignupModal";

function App() {
  const { isLoginModalOpen, isSignupModalOpen } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/login" element={<LoginModal />} /> */}
        <Route path="/portfolio" element={<PortfolioPage />} />
      </Routes>
      {isLoginModalOpen && <LoginModal />}
      {isSignupModalOpen && <SignupModal />}
    </BrowserRouter>
  );
}

export default App;
