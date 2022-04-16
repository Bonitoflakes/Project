import styled from "styled-components";
import logo from "../assets/logo.svg";
import hamburger from "../assets/hamburger.svg";
import { useState } from "react";

export default function Navbar() {
  const [toggle, setToggle] = useState(false);

  return (
    <HeaderWrapper>
      <NavBar>
        <Container>
          <Logo>
            <a href="/">
              <img src={logo} alt="Coinmarketcap" title="Go to Homepage" />
            </a>
          </Logo>

          <LinksWrapper toggle={toggle}>
            <CmcLink>
              <a href="/">Cryptocurrencies</a>
            </CmcLink>

            <CmcLink>
              <a href="/">Exchanges</a>
            </CmcLink>

            <CmcLink>
              <a href="/">NFT</a>
            </CmcLink>

            <CmcLink>
              <a href="/">CrypTown</a>
            </CmcLink>

            <CmcLink>
              <a href="/">Portfolio</a>
            </CmcLink>

            <CmcLink>
              <a href="/">WatchList</a>
            </CmcLink>

            <CmcLink>
              <a href="/">Products</a>
            </CmcLink>

            <CmcLink>
              <a href="/">Learn</a>
            </CmcLink>
          </LinksWrapper>

          <ButtonWrapper>
            <LoginButton>Login</LoginButton>
            <SignUpButton>Sign Up</SignUpButton>
            <Search type="text" placeholder="Search ..." />
          </ButtonWrapper>

          <MobileNavWrapper onClick={() => setToggle(!toggle)}>
            <MobileHamburger src={hamburger} />
          </MobileNavWrapper>
        </Container>
      </NavBar>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  min-height: 9.5rem;
`;

const NavBar = styled.div`
  border-bottom: 1px solid black;
  width: 100vw;
  min-height: 6rem;
  padding: 0 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const Container = styled.div`
  width: 100vw;
  max-width: 1400px;
  display: flex;
  align-items: center;
  margin: 0 1rem;
  position: relative;
  justify-content: space-between;
`;

const Logo = styled.div`
  cursor: pointer;
`;

const LinksWrapper = styled.div`
  display: flex;
  font-size: 1.4rem;
  background-color: white;
  @media screen and (max-width: 1200px) {
    /* display:${(props) => (props.toggle ? "flex" : "none")}; */
    font-size: clamp(5vw, 100px, 7vw);
    transition: opacity 1s ease-out;
    transition: transform 0.2s ease-out;
    transform: ${(props) =>
      props.toggle ? "translateX(0)" : "translateX(-150%)"};
    opacity: ${(props) => (props.toggle ? "1" : "0.6")};
    flex-direction: column;
    position: absolute;
    top: 6rem;
    z-index: 999;
    width: 100vw;
    height: 100vh;
    margin: 0 -4.5rem;
    /* background-color: pink ; */
  }
  @media screen and (max-width: 768px) {
    margin: 0 -2rem;
  }
`;

const CmcLink = styled.div`
  transition: transform 20s ease-in-out;
  font-size: inherit;
  font-weight: 600;
  margin-right: clamp(1.2rem, 14px, 1.5rem);

  @media screen and (min-width: 950px) and (max-width: 1200px) {
    margin-bottom: 0.25em;
    margin-right: 0;
  }

  @media screen and (max-width: 950px) {
    margin-bottom: 0.45em;
    margin-right: 0;
  }
`;

const ButtonWrapper = styled.div`
  @media screen and (max-width: 1200px) {
    display: none;
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

  &:hover {
    background: rgb(11, 64, 255);
  }
`;

const SignUpButton = styled(Button)`
  background: whitesmoke;
  color: black;
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
`;
const MobileNavWrapper = styled.div`
  @media screen and (min-width: 1201px) {
    display: none;
  }
`;

const MobileHamburger = styled.img`
  cursor: pointer;
`;
