import styled from "styled-components";
import millify from "millify";

const Coin = ({ coins }) => {
  return (
    <Row >
      <Cell>{coins.market_cap_rank}</Cell>
      <AssetCell>
        <img
          src={coins.image}
          alt="crypto"
          style={{ width: "24px", height: "24px" }}
        />
        &nbsp; &nbsp;
        <p>{coins.name}</p>
        &nbsp;
        <p>{coins.symbol.toUpperCase()}</p>
      </AssetCell>
      <Cell>₹{coins.current_price.toLocaleString("en-IN")}</Cell>

      {coins.price_change_percentage_24h > 0 ? (
        <CellGreen>{coins.price_change_percentage_24h.toFixed(2)}%</CellGreen>
      ) : (
        <CellRed>{coins.price_change_percentage_24h.toFixed(2)}%</CellRed>
      )}
      <Cell>
        ₹{millify(coins.market_cap, { precision: 3 }).toLocaleString("en-IN")}
      </Cell>
      <Cell>
        ₹{millify(coins.total_volume, { precision: 3 }).toLocaleString("en-IN")}
      </Cell>
    </Row>
  );
};

export default Coin;

const Row = styled.tr`
  border-spacing: 0;
  background-color: #fff;
  &:hover {
    background-color: rgb(248, 250, 253);
  }
`;

const Cell = styled.td`
  padding: 2rem 1rem;
  font-size: 1.4rem;
  border-bottom: 1px solid var(--gray-primary);
  text-align: center;
  text-align: right;

  &:first-child,
  &:nth-child(2) {
    text-align: left;
    position: sticky;
    left: -1px;
    z-index: 10;
    background-color: white;
  }
  &:hover {
    background-color: rgb(248, 250, 253);
  }
`;

const AssetCell = styled(Cell)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CellGreen = styled(Cell)`
  color: green;
`;
const CellRed = styled(Cell)`
  color: red;
`;
