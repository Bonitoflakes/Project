import styled from "styled-components";

const Coin = ({
  name,
  image,
  symbol,
  price,
  volume,
  priceChange,
  marketCap,
}) => {
  return (
    <Row>
      <Cell>
        <img
          src={image}
          alt="crypto"
          width={35}
          height={35}
          style={{ width: "35px", height: "35px" }}
        />
        <p>{symbol.toUpperCase()}</p>
      </Cell>
      {/* <Cell>{symbol.toUpperCase()}</Cell> */}
      <Cell>{name}</Cell>
      <Cell>₹{price.toLocaleString("en-IN")}</Cell>
      <Cell>₹{volume.toLocaleString("en-IN")}</Cell>
      {priceChange > 0 ? (
        <CellGreen>{priceChange.toFixed(2)}%</CellGreen>
      ) : (
        <CellRed>{priceChange.toFixed(2)}%</CellRed>
      )}
      <Cell>₹{marketCap.toLocaleString("en-IN")}</Cell>
    </Row>
  );
};

export default Coin;

const Row = styled.tr`
  border-spacing: 0;
`;

const Cell = styled.td`
  padding: 2rem 1rem;
  font-size: 1.4rem;
  border-bottom: 1px solid var(--gray-primary);
  text-align: center;
  &:first-child {
    position: sticky;
    left: -1px;
    z-index: 10;
    background-color: white;
  }
`;

const CellGreen = styled(Cell)`
  color: green;
`;
const CellRed = styled(Cell)`
  color: red;
`;
