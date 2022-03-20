import React, { useEffect ,useState } from 'react'
import  axios  from 'axios';

const Dashboard = () => {

  const [details, setDetails] = useState({})

  useEffect( () => {
    console.log("Fetching dashboard details....");
    fetchData();

  },[])

  const fetchData = async () => {

    const userData = await axios.get("http://localhost:8000/api/user/dashboard/");
    setDetails(userData.data.userDetails)
    console.log(userData.data.userDetails);
  }


  return (
    <>
      <h1>Overall Portfolio: {details.total_holdings_value} </h1>
      <h2>Total Invested: {(details.total_cost).toFixed(2)} </h2>
      <h2>24h change: ${details.holdings_change_24h.toFixed(2)}   {details.holdings_change_percentage}%</h2>
      {(Math.sign(details.profit_loss) > 0) ? <h1>Profit: {details.profit_loss.toFixed(2)}</h1> : <h1>Loss: ${details.profit_loss.toFixed(2)}</h1>}
    </>
  )
}

export { Dashboard }