import { useState, useContext, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { AuthContext } from "../../contexts/authContext";

import { Container, Button } from "../utils/UI_Kit";
import plusCircle from "../../assets/plus-circle.svg";
import AddassetsModal from "../AddassetsModal";
import TransactionTable from "./TransactionTable";
import HoldingTable from "./HoldingTable";
import { PortfolioChart } from "./PortfolioChart";

const Portfolio = () => {
  const { accessToken, baseURL } = useContext(AuthContext);
  const [showAddAssetModel, setShowAddAssetModel] = useState(false);
  const [userTransactions, setUserTransactions] = useState([]);
  const [userHoldings, setUserHoldings] = useState([]);

  async function fetchData() {
    try {
      const data = await axios.get(`${baseURL}/api/user/transaction`, {
        headers: {
          "access-token": accessToken,
        },
      });
      let chartData = await axios.get(`${baseURL}/api/user/holdings`, {
        headers: {
          "access-token": accessToken,
        },
      });
      setUserHoldings(chartData?.data?.data || []);

      console.log(`Running fetch Data function`);
      console.log(chartData);
      const ut = data?.data?.data;
      setUserTransactions(ut || []);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
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

        {userTransactions?.length === 0 && (
          <EmptyPortfolioWrapper>
            <Line />
            <Line />
            <Line />
            <Line />
            <EmptyPortfolioMessage>
              <h1>This Portfolio is Empty</h1>
              <p
                style={{
                  fontSize: "1.5rem",
                  color: "#58667e",
                  marginTop: "1rem",
                }}
              >
                Add any coins to get started
              </p>
            </EmptyPortfolioMessage>
          </EmptyPortfolioWrapper>
        )}

        {userTransactions?.length > 0 && userHoldings?.length > 0 && (
          <PortfolioBody>
            <div className="solidDivWrapper">
              <h1 style={{ margin: "2rem", alignSelf: "start" }}>
                Holdings Share
              </h1>
              <div
                style={{
                  width: "192px",
                  height: "192px",
                }}
              >
                <PortfolioChart userHoldings={userHoldings} />
              </div>
            </div>
            {/* // ?? End of ChartSection */}

            <div
              style={{
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <h1>Your Assets</h1>
                <HoldingTable userHoldings={userHoldings} />
              </div>
              {/* // ?? End of HoldingsTable */}

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  marginTop: "6rem",
                }}
              >
                <h1>Recent Transactions</h1>
                <TransactionTable userTransactions={userTransactions} />
              </div>
              {/* // ?? End of Transaction-Section */}
            </div>
          </PortfolioBody>
        )}
      </Container>
      <AddassetsModal
        showAddAssetModel={showAddAssetModel}
        setShowAddAssetModel={setShowAddAssetModel}
        fetchData={fetchData}
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

const EmptyPortfolioWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin-top: 10rem;
`;

const EmptyPortfolioMessage = styled.div`
  position: absolute;
  text-align: center;
`;

const Line = styled.div`
  height: 54px;
  width: 100%;
  border-bottom: 1px solid #eff2f5;
`;
