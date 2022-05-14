import { useEffect, useContext, useState } from "react";
import styled from "styled-components";

const TransactionTable = ({ userTransactions }) => {
  return (
    <>
      <RecentTransactions>
        <OverflowXAuto>
          <Table>
            <thead>
              <tr>
                <Head>Type</Head>
                <Head>Quantity</Head>
                <Head>Price</Head>
                <Head>Total</Head>
                <Head>Date & Time</Head>
              </tr>
            </thead>
            <tbody>
              {userTransactions.map((el) => (
                <Row key={el._id || Math.random()}>
                  <Cell>
                    {el.transactionType} {el.assetName}
                  </Cell>

                  {el.transactionType === "BUY" ? (
                    <CellGreen>
                      {el.quantity.toFixed(2)} {el.assetName}
                    </CellGreen>
                  ) : (
                    <CellRed>
                      {el.quantity.toFixed(2)} {el.assetName}
                    </CellRed>
                  )}
                  <Cell>{el.price}</Cell>
                  <Cell>{el.total}</Cell>
                  <Cell>
                    {el.date}
                    <br />
                    {el.time}
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

export default TransactionTable;

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
  color: green;
  &::before {
    content: "+";
  }
`;
const CellRed = styled(Cell)`
  color: red;
  &::before {
    content: "-";
  }
`;
