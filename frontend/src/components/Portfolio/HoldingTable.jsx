import styled from "styled-components";
import { formatter, percentFormatter } from "../utils/currencyFormatter.js";

const HoldingTable = ({ userHoldings }) => {
  return (
    <>
      <RecentTransactions>
        <OverflowXAuto>
          <Table>
            <thead>
              <tr>
                <Head>Asset</Head>
                <Head>Price</Head>
                <Head>Profit</Head>
                <Head>Avg. Price</Head>
                <Head>Holdings</Head>
              </tr>
            </thead>
            <tbody>
              {userHoldings.map((el) => (
                <Row key={el._id || Math.random()}>
                  <Cell>{el.assetName}</Cell>
                  <Cell>{formatter.format(el.currentPrice)} </Cell>

                  {el.total_Profit > 0 ? (
                    <CellGreen>
                      {formatter.format(el.total_Profit)}
                      <br />
                      {percentFormatter.format(el.ROI / 100)}
                    </CellGreen>
                  ) : (
                    <CellRed>
                      {formatter.format(el.total_Profit)}
                      <br />
                      {el.ROI.toFixed(2)}
                    </CellRed>
                  )}

                  <Cell>{formatter.format(el.avg_BuyPrice)}</Cell>
                  <Cell>
                    {formatter.format(el.currentValue)}
                    <br />
                    {el.total_Quantity.toFixed(2)}
                  </Cell>
                </Row>
              ))}
            </tbody>
          </Table>
        </OverflowXAuto>
      </RecentTransactions>
    </>
  );
};

export default HoldingTable;

const RecentTransactions = styled.div`
  width: 100%;
`;

const OverflowXAuto = styled.div`
  overflow-x: auto;
  width: 100%;
`;

const Table = styled.table`
  border-spacing: 0;
  width: 100%;
  @media screen and (max-width: 1023px) {
    margin-top: 3rem;
  }
`;

const Row = styled.tr`
  border-spacing: 0;
  background-color: #fff;
  &:hover {
    background-color: rgb(248, 250, 253);
  }
`;

const Head = styled.th`
  font-size: 1.2rem;
  padding: 1rem;
  border-bottom: 1px solid var(--gray-primary);
  border-spacing: 0;
  text-align: right;
  &:first-child {
    text-align: left;
  }
`;

const Cell = styled.td`
  padding: 1rem 1rem;
  font-size: 1.4rem;
  border-bottom: 1px solid var(--gray-primary);
  border-bottom: 1px solid #eff2f5;
  text-align: center;
  text-align: right;
  &:first-child {
    text-align: left;
    font-weight: 600;
  }
`;

const CellGreen = styled(Cell)`
  color: #38aa5e;
  &::before {
    content: "+";
  }
`;
const CellRed = styled(Cell)`
  color: crimson;
`;
