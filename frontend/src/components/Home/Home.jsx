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
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false"
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
        <OverflowXAuto>
          <Table>
            <THead>
              <Row>
                <Head>Ticker</Head>
                <Head>Name</Head>
                <Head>Price</Head>
                <Head>Volume</Head>
                <Head>Change</Head>
                <Head>Market Cap</Head>
              </Row>
            </THead>
            <tbody>
              {filteredCoins.map((coin) => {
                return (
                  <Coin
                    key={coin.id}
                    name={coin.name}
                    image={coin.image}
                    symbol={coin.symbol}
                    volume={coin.total_volume}
                    marketCap={coin.market_cap}
                    price={coin.current_price}
                    priceChange={coin.price_change_percentage_24h}
                  />
                );
              })}
            </tbody>
          </Table>
        </OverflowXAuto>
      </Coincontainer>
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
`;

const THead = styled.thead``;

const Row = styled.tr``;

const Head = styled.th`
  position: sticky;
  font-size: 2rem;
  padding: 1rem;
  border-bottom: 1px solid var(--gray-primary);
  top: 0;
  background: white;
  z-index: 10;
  &:first-child {
    position: sticky;
    font-size: 2rem;
    padding: 1rem;
    border-bottom: 1px solid var(--gray-primary);
    top: 0;
    background: white;
    z-index: 10;
    left: 0;
    z-index: 11;
  }
`;
