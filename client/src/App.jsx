// import React from 'react'
// import { BrowserRouter,  Route, Routes,} from "react-router-dom";
// import { Login } from './pages/login.page';
// import { Register } from './pages/register.page';
// import { Dashboard } from './pages/dashboard.page';

// const App = () => {
//   return (
//     <BrowserRouter>
//     <Routes>
//         <Route path='/register' element={<Register/>}/>
//         <Route path='/login' element={<Login/>}/>
//         <Route path='/dashboard' element={<Dashboard/>}/>
//     </Routes>
//     </BrowserRouter>
//   )
 
// }

// export default App;

import "./index.css";
import styled from "styled-components";
import logo from './assets/logo.svg'
import hamburger from './assets/hamburger.svg'
import search from './assets/search.svg'

export default function App() {
  return (
      <HeaderWrapper>
        <NavBar>
        <Container>
          <Logo>
            <img src={logo} alt="Coinmarketcap" title="Go to Homepage" />
          </Logo>
          
          <LinksWrapper>
          <div className="cmc-link">
            <a href="/">Cryptocurrencies</a>
          </div>
          
          <div className="cmc-link">
            <a href="/">Exchanges</a>
          </div>
          
          <div className="cmc-link">
            <a href="/">NFT</a>
          </div>
          
          <div className="cmc-link">
            <a href="/">CrypTown</a>
          </div>
          
            <div className="cmc-link">
            <a href="/">Portfolio</a>
          </div>
          
          <div className="cmc-link">
            <a href="/">WatchList</a>
          </div>
          
          <div className="cmc-link">
            <a href="/">Products</a>
          </div>
          
          <div className="cmc-link">
            <a href="/">Learn</a>
          </div>
          
          </LinksWrapper>

          <ButtonWrapper>
            <LoginButton>Login</LoginButton>
            <SignUpButton>Sign Up</SignUpButton>
            <Search type='text' placeholder="Search ..."/>
          </ButtonWrapper>
          
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
  width:100vw;
  min-height: 6rem;
  padding: 0 3.5rem;
  display: flex;
  align-items:center ;
  justify-content:center ;

  @media screen and (max-width: 768px){
    padding : 0 1rem;
  }

`

const Container = styled.div`
width: 100vw;
max-width: 1400px;
display: flex;
align-items: center;
/* justify-content: space-around ; */
margin:0 1rem;
`;

const Logo = styled.div`
cursor: pointer;
margin-right: 3rem ;
`;

const LinksWrapper = styled.div`
    display: flex;
`;

const ButtonWrapper = styled.div`

`;
const Button = styled.button`
    font-size: 600;
    height: 3.6rem;
    background: rgb(56, 97, 251);
    outline: none;
    border: none;
    color: white;
    padding: 0 1.6rem;
    margin-right: 2rem;
    border-radius: 10px;
    cursor: pointer;

    &:hover{
    background: rgb(11, 64, 255);
    }
`

const SignUpButton = styled(Button)`
     background: whitesmoke;
      color: black;
`

const LoginButton = styled(Button)``;

const Search = styled.input`
    height: 3.6rem;
    background: rgb(239, 242, 245);
    color: rgb(166, 176, 195);
    border-radius: 8px;
    padding:0 0.8rem;
    border: none;
    outline: none;

    &:focus{
      color: darksalmon;
    }
`