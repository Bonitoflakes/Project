import React from "react";
import { Button, Container } from "../utils/UI_Kit";
import styled from "styled-components";
import guestPorfolio from "../../assets/portfolio-guest-preview.jpg";

const PlaceholderPortfolio = () => {
  return (
    <>
      <Container>
        <Wrapper>
          <FlexContainer>
            <TextDiv>
              <TextH1>Crypto Portfolio Tracker</TextH1>
              <TextPara>
                Manage and track your crypto investments, transactions, holdings
                and performance the easy way. Create a free account and get
                real-time price signals, alerts, watchlist sync, portfolio
                customization and much more.
              </TextPara>
              <ButtonWrapper>
                <LoginButton>Login</LoginButton>
                <Button>Signup</Button>
              </ButtonWrapper>
            </TextDiv>

            <ImgDiv>
              <img src={guestPorfolio} alt="portfolio preview for guest" />
            </ImgDiv>
          </FlexContainer>
        </Wrapper>
      </Container>
    </>
  );
};

export { PlaceholderPortfolio };

const Wrapper = styled.div`
  display: flex;
  height: calc(100vh - 97px);
  /* background: pink; */
  align-items: center;
`;

const FlexContainer = styled.div`
  display: flex;
  @media (max-width: 1200px) {
    flex-direction: column;
  }
`;

const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
  margin: 2rem 4rem;
  margin-top: 5rem;
`;

const TextH1 = styled.h1`
  font-size: 3.6rem;
`;

const TextPara = styled.p`
  margin: 2rem 0;
  width: 45rem;
  font-size: 1.6rem;
  line-height: 2.4rem;
`;

const LoginButton = styled(Button)`
  margin-right: 2rem;
`;

const ImgDiv = styled.div`
  @media (min-width: 1200px) {
    height: 50%;
  }
`;
const ButtonWrapper = styled.div``;
