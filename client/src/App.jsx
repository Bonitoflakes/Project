import React from 'react'
import { BrowserRouter,  Route, Routes,} from "react-router-dom";
import { Login } from './pages/login.page';
import { Register } from './pages/register.page';
import { Dashboard } from './pages/dashboard.page';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
    </BrowserRouter>
  )
 
}

export default App;

