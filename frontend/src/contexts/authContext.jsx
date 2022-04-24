import { createContext, useState } from "react";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signupModalOpen = () => setIsSignupModalOpen(true);
  const signupModalClose = () => setIsSignupModalOpen(false);
  const loginModalOpen = () => setIsLoginModalOpen(true);
  const loginModalClose = () => setIsLoginModalOpen(false);

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
