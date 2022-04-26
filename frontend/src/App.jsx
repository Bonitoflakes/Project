import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PortfolioPage from "./pages/PortfolioPage";
import { AuthContext } from "./contexts/authContext";
import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SignupModal";
import { useDisableBodyScroll } from "./components/utils/useDisableBodyScrollHook";

function App() {
  const { isLoginModalOpen, isSignupModalOpen, showHamburger } =
    useContext(AuthContext);

  useDisableBodyScroll(isLoginModalOpen, isSignupModalOpen, showHamburger);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
      </Routes>
      {isLoginModalOpen && <LoginModal />}
      {isSignupModalOpen && <SignupModal />}
    </BrowserRouter>
  );
}

export default App;
