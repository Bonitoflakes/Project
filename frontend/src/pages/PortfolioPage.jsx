import Navbar from "../components/Navbar";
import { Container } from "../components/utils/UI_Kit";
import styled from "styled-components";
import { Button } from "../components/utils/UI_Kit";
import plusCircle from "../assets/plus-circle.svg";
import AddassetsModal from "./../components/AddassetsModal";
import { useState } from "react";

const PortfolioPage = () => {
  const [showAddAssetModel, setShowAddAssetModel] = useState(false);
  return (
    <>
      <Navbar />
      <Container>
        <FlexDiv>
          <PortfolioTitle>Portfolio Dashboard</PortfolioTitle>
          <AddAssetButton onClick={() => setShowAddAssetModel((prev) => !prev)}>
            <Flexspan>
              <SvgContainerSpan>
                <img src={plusCircle} alt="add assets" />
              </SvgContainerSpan>
              <span>Add Assets</span>
            </Flexspan>
          </AddAssetButton>
        </FlexDiv>
      </Container>
      <AddassetsModal
        showAddAssetModel={showAddAssetModel}
        setShowAddAssetModel={setShowAddAssetModel}
      />
    </>
  );
};

export default PortfolioPage;

const FlexDiv = styled.div`
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
