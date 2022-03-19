import {useState} from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('Anonymous');
  const [email, setEmail] = useState('abc@gmail.com');
  const [password, setPassword] = useState('password');
  const history = useNavigate();
  
  const sendRequest = async (a, b, c) => {
    try {
      const data = await axios.post("http://localhost:8000/api/users/signup", {
        username: a,
        email: b,
        password:c
      })
      console.log(data.data);
      history('/login')
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    <div>Sign Up Page</div>
    <input type="text" onChange={(e)=>setUsername(e.target.value)}/>
    <input type="text" onChange={(e)=>setEmail(e.target.value)}/>
    <input type="text" onChange={(e) => setPassword(e.target.value)} />
    <button onClick={()=>sendRequest(username,email,password)}>Submit</button>  
    </>
  )
}

export { Register }
