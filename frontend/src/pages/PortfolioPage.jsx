import Navbar from "../components/Navbar";
import { Portfolio } from "../components/Portfolio/Portfolio";
import { AuthContext } from "../contexts/authContext";
import { useContext } from "react";
import { PlaceholderPortfolio } from "../components/Portfolio/PlaceholderPortfolio";

const PortfolioPage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <>
      <Navbar />
      {isAuthenticated ? <Portfolio /> : <PlaceholderPortfolio />}
    </>
  );
};

export default PortfolioPage;
