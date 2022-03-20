import React, { useEffect } from 'react'
import { axios } from 'axios';

const Dashboard = () => {

  useEffect( () => {
    console.log("Welcome to Dashboard");
    async function fetchData() {
      const userData = await axios.get("localhost:8000/api/user/dashboard/:userID");
      console.log(userData);
    } 
    fetchData();
  },[])

  return (
    <div>Dashboard</div>
  )
}

export { Dashboard }