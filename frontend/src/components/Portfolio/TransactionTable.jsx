import { useEffect, useContext, useState } from "react";
import styled from "styled-components";

const TransactionTable = () => {
  return (
    <>
      <RecentTransactions>
        <OverflowXAuto>
          <Table>
            <thead>
              <Row>
                <Head>Type</Head>
                <Head>Quantity</Head>
                <Head>Price</Head>
                <Head>Total</Head>
                <Head>Date</Head>
              </Row>
            </thead>
            {data}
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
  @media screen and (max-width: 1024px) {
    margin-top: 3rem;
  }
`;

const Row = styled.tr`
  border-spacing: 0;
`;

const Head = styled.th`
  font-size: 2rem;
  padding: 1rem;
  border-bottom: 1px solid var(--gray-primary);
  border-spacing: 0;
`;
