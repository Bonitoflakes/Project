import styled from "styled-components";
import googleLogo from "../assets/google.svg";
import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/authContext";
import { ModalWrapper } from "./utils/UI_Kit";

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
          <TitleWithClose>
            <LoginTitle>SignUp</LoginTitle>
            <CloseButton onClick={signupModalClose}>X</CloseButton>
          </TitleWithClose>

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
            <PasswordLabelWrapper>
              <Label htmlFor="password">Password</Label>
            </PasswordLabelWrapper>
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

// const ModalWrapper = styled.div`
//   width: 100%;
//   /* height: calc(100% - 9rem); */
//   /* filter: blur(8px); */
//   height: 100%;
//   position: absolute;
//   top: 0;
//   left: 0;
//   background: rgba(200, 200, 200, 0.4);
//   background: #11182766;
//   backdrop-filter: blur(2px);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   box-shadow: rgb(255, 255, 255) 0 0 0 0, rgb(147, 197, 253) 0 0 0 3px;
//   @media screen and (max-width: 575px) {
//     align-items: flex-end;
//   }
// `;

const ModalContainer = styled.div`
  width: 384px;
  min-height: 448px;
  background-color: white;
  border-radius: 1rem;
  padding: 2rem 3rem;
  @media screen and (max-width: 575px) {
    width: 100%;
    border-radius: 1rem 1rem 0 0;
  }
`;

const TitleWithClose = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const LoginTitle = styled.div`
  font-weight: 700;
  font-size: 2.4rem;
`;

const CloseButton = styled.button`
  border-radius: 100%;
  width: 36px;
  height: 36px;
  outline: none;
  border: 1px solid rgb(209 213 219);
  cursor: pointer;
  background: white;

  &:hover {
    background: rgb(243 244 246);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-family: inter;
  font-size: 1.4rem;
  margin: 0.8rem 0;
`;

const Input = styled.input`
  font-weight: 600;
  width: 100%;
  height: 4rem;
  border: 1px solid rgb(209 213 219);
  outline: none;
  border-radius: 10px;
  padding: 0 1.5rem;
  font-size: 1.4rem;
  &::placeholder {
    color: lightgray;
  }

  &:hover {
    border: 1px solid rgb(59 130 246);
  }
  &:focus {
    box-shadow: rgb(255, 255, 255) 0 0 0 0, rgb(147, 197, 253) 0 0 0 3px;
  }
`;

const PasswordLabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ForgotPasswordLink = styled.a`
  font-family: inter;
  font-size: 1.4rem;
  margin: 0.8rem 0;
  color: rgb(55, 97, 251);
  font-weight: 600;
`;
const Button = styled.button`
  font-weight: 600;
  height: 3.6rem;
  background: rgb(56, 97, 251);
  outline: none;
  border: none;
  color: white;
  padding: 0 1.6rem;
  border-radius: 10px;
  cursor: pointer;
  margin: 2rem 0;
  font-size: 1.4rem;

  &:hover {
    background: rgb(11, 64, 255);
  }
`;
const LoginButton = styled(Button)``;

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
`;
