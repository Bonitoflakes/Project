import {useState} from 'react'
import axios  from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('abc@gmail.com');
  const [password, setPassword] = useState('password');
  const history = useNavigate();
  
  const sendRequest = async (b, c) => {
    try {
      const user = await axios.post("http://localhost:8000/api/users/login", {
        email: b,
        password:c
      })
      console.log(user.data);
      if (user.data.status) {
        console.log(user.data.message);
        localStorage.setItem('token', user.data.token)
        history('/dashboard')
      }
      else {
        console.log(user.data.message);
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    <h1>Login Up Page</h1>
    <p>Enter email: </p>
      <input type="text" onChange={(e) => setEmail(e.target.value)} />
    <p>Enter password: </p>
    <input type="text" onChange={(e) => setPassword(e.target.value)} />
    <button onClick={()=>sendRequest(email,password)}>Submit</button>  
    </>
  )
}

export  {Login}