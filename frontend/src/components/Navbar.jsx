import { useContext } from "react";
import styled from "styled-components";
import logo from "../assets/logo.svg";
import hamburger from "../assets/hamburger.svg";
import { useState } from "react";
import { Container } from "./utils/UI_Kit";
import { FaUserAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import { useDisableBodyScroll } from "./utils/useDisableBodyScrollHook";

const Navbar = () => {
  const {
    loginModalOpen,
    signupModalOpen,
    isAuthenticated,
    setIsAuthenticated,
    setAccessToken,
    showHamburger,
    setShowHamburger,
  } = useContext(AuthContext);

  return (
    <Container>
      <Nav>
        <Logo href="/">
          <img src={logo} alt="Logo" title="Go To Homepage" />
        </Logo>

        <LinksWrapper showHamburger={showHamburger}>
          <CmcLink to="/">Cryptocurrencies</CmcLink>
          <CmcLink to="/portfolio">Portfolio</CmcLink>

          {/*
            //* Hide the login and signup buttons if user is authenticated
          */}

          {!isAuthenticated && (
            <ButtonWrapper>
              <LoginButton onClick={loginModalOpen}>Login</LoginButton>
              <SignUpButton onClick={signupModalOpen}>
                {showHamburger ? "Create an account now" : "Sign Up"}
              </SignUpButton>
            </ButtonWrapper>
          )}

          {/*
           //TODO: Show logOut if user is authenticated
           */}

          {isAuthenticated && (
            <>
              <FaUserAlt />{" "}
              <a
                href="/"
                onClick={() => {
                  setIsAuthenticated(false);
                  setAccessToken("");
                }}
              >
                Logout
              </a>
            </>
          )}
        </LinksWrapper>

        <MobileNavWrapper onClick={() => setShowHamburger((prev) => !prev)}>
          <MobileHamburger
            src={hamburger}
            title="click to open hamburger menu"
          />
        </MobileNavWrapper>
      </Nav>
    </Container>
  );
};

export default Navbar;

const Nav = styled.nav`
  /* background: pink; */
  min-height: 6.5rem;
  align-items: center;
  justify-content: space-between;
  display: flex;
  width: 100%;
  position: relative;
`;

const Logo = styled.a`
  cursor: pointer;
  color: black;
`;

const LogoTitle = styled.h1`
  font-size: 2rem;
`;

const LinksWrapper = styled.div`
  display: flex;
  /* background: white; */
  align-items: center;
  font-size: 1.4rem;
  @media screen and (max-width: 1200px) {
    flex-direction: column;
    z-index: 999;
    align-items: stretch;
    position: absolute;
    top: 7.8rem;
    height: calc(100vh - 8.1rem);
    width: 100%;
    background: white;
    font-size: min(34px, 5vw);
    transition: transform 0.2s ease-out;
    transform: ${(props) =>
      props.showHamburger ? "translateX(0)" : "translateX(-150%)"};
  }
`;

const CmcLink = styled(NavLink)`
  font-size: inherit;
  font-weight: 600;
  color: black;
  margin-right: 1rem;

  @media screen and (max-width: 1200px) {
    margin-right: 0;
    padding: 1.5rem 1rem;
    border-bottom: 1px solid black;
  }
  &:hover {
    color: #3861fb;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 4rem;
  @media screen and (max-width: 1200px) {
    margin-left: 0;
    flex-direction: column;
  }
`;

const Button = styled.button`
  font-size: 600;
  height: 3.6rem;
  background: rgb(56, 97, 251);
  outline: none;
  border: none;
  color: white;
  padding: 0 1.6rem;
  margin-right: 1rem;
  border-radius: 10px;
  cursor: pointer;

  @media screen and (max-width: 1200px) {
    width: 99%;
    margin: 1rem 0 0 0;
  }

  &:hover {
    background: rgb(11, 64, 255);
  }
`;

const SignUpButton = styled(Button)`
  background: whitesmoke;
  color: black;
  &:hover {
    background: #d1d1d1;
  }
`;

const LoginButton = styled(Button)``;

const Search = styled.input`
  height: 3.6rem;
  background: rgb(239, 242, 245);
  color: rgb(166, 176, 195);
  border-radius: 8px;
  padding: 0 0.8rem;
  border: none;
  outline: none;
  width: max(8vw, 10rem);
  &:focus {
    color: darksalmon;
  }
  @media screen and (max-width: 1200px) {
    display: none;
  }
`;

const MobileNavWrapper = styled.div`
  @media screen and (min-width: 1201px) {
    display: none;
  }
`;

const MobileHamburger = styled.img`
  cursor: pointer;
`;
