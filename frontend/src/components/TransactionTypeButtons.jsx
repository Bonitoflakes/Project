import React, { useState } from "react";
import "./TransactionTypeButtons.css";

export default function TransactionTypeButtons({
  transactionDetails,
  setTransactionDetails,
}) {
  const [disableBtn, setDisableBtn] = useState(true);

  const handleTransactionTypeChange = (e) => {
    e.preventDefault();
    e.target.classList.add("selected");

    // * BUY Transaction
    if (e.target.classList.contains("transactionType_Buy")) {
      setDisableBtn((prev) => !prev);
      setTransactionDetails({
        ...transactionDetails,
        transactionType: e.target.value,
      });

      if (e.target.nextElementSibling) {
        e.target.nextElementSibling.classList.remove("selected");
      }
    }

    // * SELL Transaction
    if (e.target.classList.contains("transactionType_Sell")) {
      setDisableBtn((prev) => !prev);
      setTransactionDetails({
        ...transactionDetails,
        transactionType: e.target.value,
      });

      if (e.target.previousElementSibling) {
        e.target.previousElementSibling.classList.remove("selected");
      }
    }
  };

  return (
    <>
      {/* <h1>Type: {transactionDetails.transactionType}</h1> */}
      <div className="btn-group">
        <button
          className="buttons transactionType_Buy selected"
          onClick={handleTransactionTypeChange}
          disabled={disableBtn}
          name="transactionType"
          value="BUY"
        >
          Buy
        </button>
        <button
          className="buttons transactionType_Sell"
          onClick={handleTransactionTypeChange}
          disabled={!disableBtn}
          name="transactionType"
          value="SELL"
        >
          Sell
        </button>
      </div>
    </>
  );
}
