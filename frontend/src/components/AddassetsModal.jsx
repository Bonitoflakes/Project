import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/authContext";
import {
  CloseButton,
  Container,
  Input,
  Label,
  ModalContainer,
  ModalWrapper,
  Button,
  Title,
  TitleWrapper,
} from "./utils/UI_Kit";

const AddassetsModal = ({ showAddAssetModel, setShowAddAssetModel }) => {
  const [showFeesNotes, setShowFeesNotes] = useState(false);
  const { accessToken } = useContext(AuthContext);

  const initState = {
    assetName: "",
    quantity: 0,
    price: 0,
    date: new Date().toLocaleDateString("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }),
    time: String(new Date()).slice(16, 21),
    total: 0,
    notes: "",
    fees: 0,
  };

  const [transactionDetails, setTransactionDetails] = useState(initState);

  useEffect(() => {
    setTransactionDetails({
      ...transactionDetails,
      total: (transactionDetails.price * transactionDetails.quantity).toFixed(
        2
      ),
    });
  }, [transactionDetails.quantity, transactionDetails.price]);

  // * Handles form submit
  const handleTransaction = (e) => {
    e.preventDefault();
    console.table(transactionDetails);
    const data = axios.post(
      "http://localhost:8000/api/user/transaction",
      {
        transactionDetails,
      },
      {
        headers: {
          "access-token": accessToken,
        },
      }
    );
    console.log(data);
    setShowAddAssetModel((prev) => !prev);
  };

  const handleFormValueChange = (e) => {
    setTransactionDetails({
      ...transactionDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleTotalCost = (e) => {
    setTransactionDetails({
      ...transactionDetails,
      total: e.target.value,
      price: e.target.value / transactionDetails.quantity,
    });
  };

  return (
    <>
      {showAddAssetModel && (
        <Container>
          <ModalWrapper>
            <ModalContainer width={0}>
              <TitleWrapper>
                <Title>Add Assets</Title>
                <CloseButton
                  onClick={() => setShowAddAssetModel((prev) => !prev)}
                >
                  X
                </CloseButton>
              </TitleWrapper>
              <form onSubmit={(e) => handleTransaction(e)}>
                <Label>Asset Name</Label>
                <Input
                  type="text"
                  list="browsers"
                  placeholder="Select Cryptocurrency"
                  value={transactionDetails.assetName}
                  name="assetName"
                  onChange={handleFormValueChange}
                  required
                />
                <datalist id="browsers">
                  <option value="BTC">₿ Bitcoin</option>
                  <option value="BNB">Binance</option>
                  <option value="BUSD">Binance USD</option>
                  <option value="USDT">Tether USDT</option>
                </datalist>

                <Label>Quantity</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={transactionDetails.quantity}
                  name="quantity"
                  onChange={handleFormValueChange}
                  min="0"
                  step="any"
                  required
                />

                <Label>Price</Label>
                <Input
                  type="number"
                  placeholder="0.0"
                  name="price"
                  value={transactionDetails.price}
                  onChange={handleFormValueChange}
                  min="0"
                  step="any"
                  required
                />

                <Label>Date & Time</Label>
                <DateWrapper>
                  <Input
                    name="date"
                    type="date"
                    // defaultValue={new Date().toLocaleDateString("en-CA", {
                    //   year: "numeric",
                    //   month: "2-digit",
                    //   day: "2-digit",
                    // })}
                    value={transactionDetails.date}
                    onChange={handleFormValueChange}
                  />
                  {/* <Input
                  type="datetime-local"
                  defaultValue={new Date().toISOString()}
                /> */}
                  <Input
                    name="time"
                    type="time"
                    // defaultValue={String(new Date()).slice(16, 21)}
                    value={transactionDetails.time}
                    onChange={handleFormValueChange}
                  />
                </DateWrapper>

                <Label>Total</Label>
                <Input
                  type="number"
                  name="total"
                  placeholder="0"
                  value={transactionDetails.total}
                  onChange={(e) => handleTotalCost(e)}
                  min="0"
                  step="any"
                />

                {showFeesNotes && (
                  <div>
                    <Label>Note</Label>

                    <span
                      style={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Input
                        type="text"
                        name="notes"
                        placeholder="Note (Optional)"
                        value={transactionDetails.notes}
                        onChange={(e) => handleFormValueChange(e)}
                      />
                      <div
                        style={{
                          position: "absolute",
                          right: 0,
                          display: "flex",
                          fontSize: "1.5rem",
                          letterSpacing: "0.1rem",
                          color: "var(--gray-primary)",
                          marginRight: "1rem",
                        }}
                      >
                        SOUL
                      </div>
                    </span>
                  </div>
                )}
                {!showFeesNotes && (
                  <AddFeesNotes
                    onClick={() => {
                      setShowFeesNotes((prev) => !prev);
                    }}
                  >
                    + Fees,Notes
                  </AddFeesNotes>
                )}
                <AddTransactionButton type="submit">
                  Add Transaction
                </AddTransactionButton>
              </form>
            </ModalContainer>
          </ModalWrapper>
        </Container>
      )}
    </>
  );
};

const AddFeesNotes = styled(Button)`
  width: 100%;
  color: black;
  background-color: white;
  border: 1px solid var(--gray-primary);

  &:hover {
    background: var(--gray-variant-hover);
  }
`;

const AddTransactionButton = styled(Button)`
  width: 100%;
`;

const DateWrapper = styled(TitleWrapper)`
  margin: 0;
`;

export default AddassetsModal;
