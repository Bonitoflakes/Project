import { createContext, useState } from "react";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  const signupModalOpen = () => setIsSignupModalOpen(true);
  const signupModalClose = () => setIsSignupModalOpen(false);
  const loginModalOpen = () => setIsLoginModalOpen(true);
  const loginModalClose = () => setIsLoginModalOpen(false);

  const logOut = () => {
    setIsAuthenticated(false);
    setAccessToken("");
  };

  const redirectToLogin = () => {
    signupModalClose();
    loginModalOpen();
  };

  const redirectToSignup = () => {
    loginModalClose();
    signupModalOpen();
  };

  return (
    <AuthContext.Provider
      value={{
        isLoginModalOpen,
        isSignupModalOpen,
        isAuthenticated,
        signupModalClose,
        signupModalOpen,
        loginModalClose,
        loginModalOpen,
        setIsAuthenticated,
        redirectToLogin,
        redirectToSignup,
        setAccessToken,
        accessToken,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
