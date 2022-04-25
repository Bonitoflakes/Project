import plusCircle from "../../assets/plus-circle.svg";
import AddassetsModal from "../AddassetsModal";
import { Container, Button } from "../utils/UI_Kit";
import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import TransactionTable from "./TransactionTable";
import axios from "axios";
import { AuthContext } from "../../contexts/authContext";

const Portfolio = () => {
  const { accessToken } = useContext(AuthContext);
  const [showAddAssetModel, setShowAddAssetModel] = useState(false);
  const [userTransactions, setUserTransactions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/api/user/transaction",
          {
            headers: {
              "access-token": accessToken,
            },
          }
        );
        console.log(data);
        setUserTransactions(data.transactionDetails);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const handleAddAssetButton = () => {
    setShowAddAssetModel((prev) => !prev);
  };

  return (
    <>
      <Container>
        <PortfolioHeader>
          <PortfolioTitle>Portfolio Dashboard</PortfolioTitle>
          <AddAssetButton onClick={handleAddAssetButton}>
            <Flexspan>
              <SvgContainerSpan>
                <img src={plusCircle} alt="add assets" />
              </SvgContainerSpan>
              <span>Add Assets</span>
            </Flexspan>
          </AddAssetButton>
        </PortfolioHeader>

        <PortfolioBody>
          <div className="solidDivWrapper">
            <div className="solidDiv"></div>
          </div>
          <RecentTransactions>
            <OverflowXAuto>
              <Table>
                <thead>
                  <Row>
                    <Head>Type</Head>
                    <Head>Quantity</Head>
                    <Head>Price</Head>
                    <Head>Total</Head>
                    <Head>Date & Time</Head>
                  </Row>
                </thead>
                <tbody>
                  {userTransactions.map((el) => (
                    <Row key={el._id || Math.random()}>
                      <Cell>{el.assetName}</Cell>
                      <Cell>{el.quantity}</Cell>
                      <Cell>{el.price}</Cell>
                      <Cell>{el.date}</Cell>
                      <Cell>{el.time}</Cell>
                    </Row>
                  ))}
                </tbody>
              </Table>
            </OverflowXAuto>
          </RecentTransactions>
        </PortfolioBody>
      </Container>
      <AddassetsModal
        showAddAssetModel={showAddAssetModel}
        setShowAddAssetModel={setShowAddAssetModel}
        setUserTransactions={setUserTransactions}
        userTransactions={userTransactions}
      />
    </>
  );
};

export { Portfolio };

const PortfolioBody = styled.div`
  margin-top: 2.4rem;
  display: flex;
  align-items: flex-start;

  @media screen and (max-width: 1023px) {
    flex-direction: column;
  }
`;

const PortfolioHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 575px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const PortfolioTitle = styled.h1`
  @media screen and (min-width: 1024px) {
    font-size: 3rem;
  }
  @media screen and (min-width: 576px) and (max-width: 1023px) {
    font-size: 2.4rem;
  }
`;

const AddAssetButton = styled(Button)`
  margin-bottom: 0;
  @media screen and (max-width: 575px) {
    margin-top: 1.6rem;
    width: 100%;
  }
`;

const Flexspan = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SvgContainerSpan = styled.span`
  width: 2.4rem;
  height: 2.4rem;
  margin-right: 0.6rem;
`;

const RecentTransactions = styled.div`
  width: 100%;
`;

const OverflowXAuto = styled.div`
  overflow-x: auto;
  width: 100%;
`;

const Table = styled.table`
  margin-top: 3rem;
  border-spacing: 0;
  width: 100%;
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

const Cell = styled.td`
  padding: 2rem 1rem;
  font-size: 1.4rem;
  border-bottom: 1px solid black;
  border-bottom: 1px solid var(--gray-primary);
  text-align: center;
`;
