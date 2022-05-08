import styled from "styled-components";
import googleLogo from "../assets/google.svg";
import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/authContext";
import {
  ModalWrapper,
  ModalContainer,
  TitleWrapper,
  Title,
  CloseButton,
  Form,
  Label,
  LabelWrapper,
  Input,
  Button,
} from "./utils/UI_Kit";

const LoginModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    loginModalClose,
    redirectToSignup,
    setIsAuthenticated,
    setAccessToken,
    setShowHamburger,
  } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(`email : ${email}`);
    console.log(`password : ${password}`);
    try {
      const user = await axios.post("http://localhost:8000/api/users/login", {
        email,
        password,
      });
      console.log(user.data);
      if (!user.data.status) {
        alert("Invalid Username or Password");
        return;
      }
      setIsAuthenticated(user.data.status);
      setAccessToken(user.data.token);
      loginModalClose();
      setShowHamburger(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <ModalWrapper>
        <ModalContainer>
          <TitleWrapper>
            <Title>Login</Title>
            <CloseButton onClick={loginModalClose}>X</CloseButton>
          </TitleWrapper>

          <Form onSubmit={handleSubmit}>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <LabelWrapper>
              <Label htmlFor="password">Password</Label>
              <ForgotPasswordLink href="/">ForgotPassword?</ForgotPasswordLink>
            </LabelWrapper>
            <Input
              type="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength="8"
              required
            />
            <LoginButton type="submit">Login</LoginButton>
          </Form>

          <OrText>
            <Linespan></Linespan>
            <Textspan>Or continue with</Textspan>
            <Linespan></Linespan>
          </OrText>

          <GoogleButton>
            <GoogleLogoSpan>
              <img src={googleLogo} alt="google" />
            </GoogleLogoSpan>
            <GoogleTextSpan>Sign in with Google</GoogleTextSpan>
          </GoogleButton>

          <RedirectText>
            Don't have an Account yet?{" "}
            <RedirectLink onClick={redirectToSignup}>Create now</RedirectLink>
          </RedirectText>
        </ModalContainer>
      </ModalWrapper>
    </>
  );
};

export default LoginModal;

const ForgotPasswordLink = styled.a`
  font-family: inter;
  font-size: 1.4rem;
  margin: 0.8rem 0;
  color: rgb(55, 97, 251);
  font-weight: 600;
`;

const LoginButton = styled(Button)`
  margin: 2rem 0;
`;

const OrText = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
const Linespan = styled.span`
  height: 1px;
  background: rgb(229 231 235);
  flex-grow: 1;
`;
const Textspan = styled.span`
  color: rgb(156 163 175);
  font-size: 1.4rem;
  padding: 0 0.8rem;
  flex-shrink: 0;
`;
const GoogleButton = styled(Button)`
  color: black;
  background-color: white;
  border: 1px solid rgb(209 213 219);
  height: 3rem;
  border-radius: 5px;
  width: 100%;
  display: flex;
  align-items: center;
  margin: 2rem 0;
  justify-content: space-between;

  &:hover {
    background-color: rgb(209 213 219);
  }
`;
const GoogleTextSpan = styled.span`
  flex-grow: 1;
`;
const GoogleLogoSpan = styled.span`
  height: 16px;
  width: 16px;
`;

const RedirectText = styled.p`
  text-align: center;
  font-size: 1.4rem;
  margin-top: 2rem;
`;
const RedirectLink = styled.a`
  color: rgb(55, 97, 251);
  outline: none;
  border: none;
  background: transparent;
  cursor: pointer;
`;
