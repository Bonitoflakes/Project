import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/authContext";
import {
  CloseButton,
  Input,
  Label,
  ModalContainer,
  ModalWrapper,
  Button,
  Title,
  TitleWrapper,
} from "./utils/UI_Kit";
import { useDisableBodyScroll } from "./utils/useDisableBodyScrollHook";

const EditAssetModal = ({
  showEditTransactionModal,
  setShowEditTransactionModal,
  fetchData,
  currentTransactionToEdit,
  setCurrentTransactionToEdit,
}) => {
  const { price, quantity, total, assetName } = currentTransactionToEdit;
  const { accessToken, baseURL } = useContext(AuthContext);

  // * Two-way binding between total and price
  useEffect(() => {
    setCurrentTransactionToEdit({
      ...currentTransactionToEdit,
      total: (currentTransactionToEdit.price * currentTransactionToEdit.quantity).toFixed(
        2
      ),
    });
  }, [currentTransactionToEdit.quantity, currentTransactionToEdit.price]);

  const handleEdit = (e) => {
    setCurrentTransactionToEdit({
      ...currentTransactionToEdit,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    console.table({
      price: currentTransactionToEdit.price,
      quantity: currentTransactionToEdit.quantity,
      total: currentTransactionToEdit.total,
    });

    const data = await axios.put(
      `${baseURL}/api/user/transaction`,
      {
        id: currentTransactionToEdit._id,
        transactionDetails: {
          price: currentTransactionToEdit.price,
          quantity: currentTransactionToEdit.quantity,
          total: currentTransactionToEdit.total,
        },
      },
      {
        headers: {
          "access-token": accessToken,
        },
      }
    );

    console.log(`Data sent to the server: ${data}`);
    fetchData();
    setShowEditTransactionModal((prev) => !prev);
  };

  return (
    <>
      {showEditTransactionModal && (
        <ModalWrapper>
          <ModalContainer>
            <TitleWrapper>
              <Title>Edit Transaction</Title>
              <CloseButton onClick={() => setShowEditTransactionModal((prev) => !prev)}>
                X
              </CloseButton>
            </TitleWrapper>

            <Label>Asset Name</Label>
            <Input type="text" value={assetName} disabled />

            <Label>Price</Label>
            <Input
              type="number"
              name="price"
              value={price}
              onChange={(e) => handleEdit(e)}
            />

            <Label>Quantity</Label>
            <Input
              type="number"
              name="quantity"
              value={quantity}
              onChange={(e) => handleEdit(e)}
            />

            <Label>Total</Label>
            <Input
              type="number"
              name="total"
              value={total}
              onChange={(e) => handleEdit(e)}
            />

            <EditTransactionButton onClick={handleSubmit}>
              Edit Transaction
            </EditTransactionButton>
          </ModalContainer>
        </ModalWrapper>
      )}
    </>
  );
};

const EditTransactionButton = styled(Button)`
  width: 100%;
`;

export default EditAssetModal;
