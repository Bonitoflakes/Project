import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  max-width: 1400px;
  padding: 0.8rem 1.6rem;
  margin: 0 auto;
`;
const ModalWrapper = styled.div`
  width: 100%;
  /* height: calc(100% - 9rem); */
  /* filter: blur(8px); */
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: #11182766;
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: white 0 0 0 0, var(--blue-variant-shadow) 0 0 0 3px;
  @media screen and (max-width: 575px) {
    align-items: flex-end;
  }
`;

const ModalContainer = styled.div`
  width: ${(props) => (props.width > 384 ? props.width + "px" : "384px")};
  min-height: 448px;
  background-color: white;
  border-radius: 2rem;
  padding: 2rem 3rem;

  @media screen and (max-width: 575px) {
    width: 100%;
    border-radius: 1rem 1rem 0 0;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 2.4rem;
`;

const CloseButton = styled.button`
  border-radius: 100%;
  width: 36px;
  height: 36px;
  outline: none;
  border: 1px solid var(--gray-primary);
  cursor: pointer;
  background: white;

  &:hover {
    background: var(--gray-variant-hover);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const LabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.label`
  font-family: inter;
  font-size: 1.4rem;
`;

const Input = styled.input`
  font-weight: 600;
  width: 100%;
  height: 4rem;
  border: 1px solid var(--gray-primary);
  outline: none;
  border-radius: 10px;
  padding: 0 1.5rem;
  font-size: 1.4rem;
  margin: 1rem 0;
  appearance: none;

  &::placeholder {
    color: var(--gray-primary);
  }

  &:hover {
    border: 1px solid var(--blue-variant-hover);
  }
  &:focus {
    box-shadow: white 0 0 0 0, var(--blue-variant-shadow) 0 0 0 3px;
  }
`;

const Button = styled.button`
  min-height: 3.6rem;
  font-size: 1.4rem;
  font-weight: 600;
  background: var(--blue-primary);
  color: white;
  padding: 0 1.6rem;
  border-radius: 1rem;
  cursor: pointer;
  outline: none;
  border: none;
  margin-bottom: 1rem;

  &:hover {
    background: var(--blue-variant-hover-dark);
  }
`;

export {
  Container,
  ModalWrapper,
  ModalContainer,
  TitleWrapper,
  Title,
  CloseButton,
  Form,
  LabelWrapper,
  Label,
  Input,
  Button,
};
