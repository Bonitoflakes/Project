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

const SignupModal = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signupModalClose, redirectToLogin } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(`Username : ${username}`);
    console.log(`email : ${email}`);
    console.log(`password : ${password}`);
    try {
      const data = await axios.post("http://localhost:8000/api/users/signup", {
        username,
        email,
        password,
      });
      console.log(data.data);
      signupModalClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ModalWrapper>
        <ModalContainer>
          <TitleWrapper>
            <Title>SignUp</Title>
            <CloseButton onClick={signupModalClose}>X</CloseButton>
          </TitleWrapper>

          <Form onSubmit={handleSubmit}>
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              name="username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              autoComplete="new-password"
              value={password}
              minLength="8"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <LoginButton type="submit">Sign Up</LoginButton>
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
            <GoogleTextSpan>Sign up with Google</GoogleTextSpan>
          </GoogleButton>

          <RedirectText>
            Already have an account with us?{" "}
            <RedirectLink onClick={redirectToLogin}>Login now</RedirectLink>
          </RedirectText>
        </ModalContainer>
      </ModalWrapper>
    </>
  );
};

export default SignupModal;

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
  justify-content: space-between;
  margin: 2rem 0;

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
const RedirectLink = styled.button`
  color: rgb(55, 97, 251);
  outline: none;
  border: none;
  background: transparent;
  cursor: pointer;

  &:focus {
    border: 1px solid black;
  }
`;
