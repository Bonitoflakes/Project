import React from 'react'
import { BrowserRouter,  Route, Routes,} from "react-router-dom";
import { Login } from './pages/login.page';
import { Register } from './pages/register.page';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
    </Routes>
    </BrowserRouter>
  )
 
}

export default App;

