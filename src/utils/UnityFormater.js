import React from "react";
import CurrencyFormat from "react-currency-format";

function PriceFormater({ price }) {
  return (
    <strong>
      <CurrencyFormat
        decimalScale={2}
        value={price}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"R$"}
      />
    </strong>
  );
}

function PercentualFormater({ value }) {
  return (
    <strong style={{ color: value >= 0 ? "blue" : "red" }}>
      {value >= 0 ? "^" : "˅"}
      {value.toFixed(2)}%
    </strong>
  );
}

function DateFormater({ date }) {
  const parsedDate = new Date(date);
  return (
    <>
      {parsedDate.getDay() + 1}{" "}
      {parsedDate.toLocaleDateString("default", { month: "short" })}{" "}
      {parsedDate.getFullYear} -{" "}
      {parsedDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}
    </>
  );
}

export { PriceFormater, PercentualFormater, DateFormater };
