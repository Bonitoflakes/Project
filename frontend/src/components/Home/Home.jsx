import Coin from "./Coin.jsx";
import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Container } from "../utils/UI_Kit";
import dummyData from "../../fakeApiService";

const Home = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setCoins(dummyData());
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLocaleLowerCase())
  );

  return (
    <Container>
      <Coincontainer>
        <Search
          onChange={handleChange}
          placeholder="🔍 Search any crypto here ...."
        />
      </Coincontainer>

      <div>
        <h1>Cryptocurrency Market</h1>
      </div>
      <OverflowXAuto>
        <Table>
          <thead>
            <tr>
              <Head>#</Head>
              <Head>Asset</Head>
              <Head>Market Price</Head>
              <Head>24% Price</Head>
              <Head>Market Cap</Head>
              <Head>Volume</Head>
            </tr>
          </thead>
          <tbody>
            {filteredCoins.map((coin) => {
              return <Coin coins={coin} key={coin.id} />;
            })}
          </tbody>
        </Table>
      </OverflowXAuto>
    </Container>
  );
};

export default Home;

const Coincontainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;
const OverflowXAuto = styled.div`
  overflow-x: auto;
  width: 100%;
`;

const Search = styled.input`
  height: 3.6rem;
  background: rgb(239, 242, 245);
  color: rgb(166, 176, 195);
  border-radius: 8px;
  padding: 0 0.8rem;
  border: none;
  outline: none;
  width: clamp(300px, 40vw, 60vw);
  &:focus {
    color: darksalmon;
  }
`;

const Table = styled.table`
  margin-top: 3rem;
  border-spacing: 0;
  width: 100%;
  table-layout: auto;
  border-collapse: collapse;
  position: relative;
`;

const Head = styled.th`
  font-size: 1.2rem;
  padding: 1rem;
  border-bottom: 1px solid var(--gray-primary);
  border-spacing: 0;
  text-align: right;
  position: sticky;
  top: 0;
  z-index: 10;
  text-align: right;

  &:nth-child(2),
  &:first-child {
    text-align: left;
    border-bottom: 1px solid var(--gray-primary);
    top: 0;
    background: white;
    z-index: 10;
    left: -1px;
    z-index: 11;
  }
`;
