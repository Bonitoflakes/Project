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
    <div className="App">
      <HeaderWrapper>
        <HeaderP1>
          <Logo src={logo}/>
          <SearchandHamWrapper>
            <SearchBar src={search}/>
            <HamburgerMenu src={hamburger}/>
          </SearchandHamWrapper>
        </HeaderP1>
        <Line/>
        <HeaderP2 />
        <Line/>
      </HeaderWrapper>
    </div>
  );
}

const HeaderWrapper = styled.header`
  // background-color: pink;
  // padding: 0 3.5rem;
  min-height: 9.5rem;
`;

const Line = styled.div`
border-bottom: 1px solid black;
width: 100vw;
height: 1px;
`

const HeaderP1 = styled.div`
  // background-color: yellow;
  min-height: 6rem;
  padding: 0 3.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const HeaderP2 = styled.div`
  background-color: brown;
  min-height: 3.5rem;
  margin: 0 3.5rem;

`;

const SearchandHamWrapper = styled.div`
display:flex;
align-items:center;
margin:1rem;
`;

const Logo = styled.img``;
const SearchBar = styled.img`
margin:0 1.5rem;
`;
const HamburgerMenu = styled.img``;
