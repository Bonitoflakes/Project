import {useContext} from "react";
import { Button, Container } from "../utils/UI_Kit";
import styled from "styled-components";
import guestPorfolio from "../../assets/portfolio-guest-preview.png";

const PlaceholderPortfolio = () => {
  const {
    loginModalOpen,
    signupModalOpen,
  } = useContext(AuthContext);

  return (
    <>
      <Container>
        <PlaceholderWrapper>
          <FlexContainer>
            <LeftActions>
              <TextH1>Crypto Portfolio Tracker</TextH1>
              <TextPara>
                Manage and track your crypto investments, transactions, holdings
                and performance the easy way. Create a free account and get
                real-time price signals, alerts, watchlist sync, portfolio
                customization and much more.
              </TextPara>
              <ButtonWrapper>
                <LoginButton onClick={loginModalOpen}>Login</LoginButton>
                <Button onClick={signupModalOpen}>Signup</Button>
              </ButtonWrapper>
            </LeftActions>

            <RightActions>
              <img src={guestPorfolio} alt="portfolio preview for guest" />
            </RightActions>
          </FlexContainer>
        </PlaceholderWrapper>
      </Container>
    </>
  );
};

export { PlaceholderPortfolio };

const PlaceholderWrapper = styled.div`
  display: flex;
  min-height: calc(100vh - 97px);
  /* background: pink; */
  align-items: center;
`;

const FlexContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;

  @media (max-width: 1200px) {
    flex-direction: column-reverse;
  }
`;

const LeftActions = styled.div`
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
  margin: 2rem 4rem;

  @media (max-width: 585px) {
    margin: 2rem;
  }
  /* background-color: orange; */
`;

const TextH1 = styled.h1`
  font-size: 3.6rem;
  @media (max-width: 585px) {
    font-size: 2.6rem;
  }
`;

const TextPara = styled.p`
  margin: 2rem 0;
  font-size: 1.6rem;
  line-height: 2.4rem;
`;

const RightActions = styled.div`
  flex: 1.3 1 0%;
  @media (max-width: 1200px) and (min-width: 1000px) {
    padding: 0 10rem;
  }
`;
const ButtonWrapper = styled.div``;

const LoginButton = styled(Button)`
  margin-right: 2rem;
`;
