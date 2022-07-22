import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import {
  PriceFormater,
  PercentualFormater,
  DateFormater,
} from "../../utils/UnityFormater";
import "./Portfolio.css";

function Portfolio() {
  const [userPortfolio, setUserPortfolio] = useState([]);

  async function getData() {
    const response = await api.get("/api/v1/investments/");
    const data = await Promise.all(
      response.data.map(async (item) => {
        const quote = await api.get(
          "/api/v1/investments/quote?symbol=" + item.symbol
        );
        return {
          ...item,
          price: quote.data.c,
          pChange: ((quote.data.c - item.buyingPrice) * 100) / item.buyingPrice,
        };
      })
    );
    setUserPortfolio(data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="portfolio">
      <div className="portfolio__table">
        {TableBuilder(userPortfolio, getData)}
      </div>
    </div>
  );
}

function TableBuilder(data, getData) {
  const initialState = {
    symbol: "",
    buyingDateAndTime: "",
    quantity: "",
    buyingPrice: "",
  };
  const [newItem, setNewItem] = useState(initialState);

  async function sendAddRequest() {
    let response = await api.post("/api/v1/investments/", newItem);
    console.log(response);
    getData();
    hideInputFields();
  }

  function rowFiller(row, idx) {
    return (
      <tr className={`row__${idx % 2}`}>
        <td className="tcell__value">{row.symbol}</td>
        <td className="tcell__value">{row.quantity}</td>
        <td className="tcell__value">
          <DateFormater date={row.buyingDateAndTime} />
        </td>
        <td className="tcell__value">
          <PriceFormater price={row.buyingPrice} />
        </td>
        <td className="tcell__value">
          <PriceFormater price={row.price} />
        </td>
        <td className="tcell__value">
          <PercentualFormater value={row.pChange} />
        </td>
        <td className="tcell__value">
          <button id={row.id} onClick={DeleteItem}>
            🗑
          </button>
        </td>
      </tr>
    );
  }

  return (
    <table>
      <thead>
        <tr>
          <th className="thead__name" id="symbol">
            Symbol
          </th>
          <th className="thead__name" id="quantity">
            Quantity
          </th>
          <th className="thead__name" id="buyingDateAndTime">
            Buying Date
          </th>
          <th className="thead__name" id="buyingPrice">
            Buying Price
          </th>
          <th className="thead__name" id="currentPrice">
            Current Price
          </th>
          <th className="thead__name" id="percentualChange">
            % Change
          </th>
        </tr>
      </thead>
      <tbody>{data.map((row, idx) => rowFiller(row, idx))}</tbody>
      <tr>
        {Array.from(document.querySelectorAll(".thead__name")).map((th) => {
          return (
            <td className="tcell__value">
              <input
                type={th.id == "buyingDateAndTime" ? "datetime-local" : "text"}
                className="input__field add__element hidden"
                disabled={
                  th.id == "currentPrice"
                    ? true
                    : th.id == "percentualChange"
                    ? true
                    : false
                }
                value={newItem[th.id]}
                onChange={(e) => {
                  let item = { ...newItem };
                  item[th.id] = e.target.value.toUpperCase();
                  setNewItem(item);
                }}
              ></input>
            </td>
          );
        })}

        <td className="tcell__value">
          <button onClick={showInputFields} className="plus_btn active">
            +
          </button>
          <div className="add__element add__buttons hidden">
            <button onClick={hideInputFields}>🗙</button>
            <button onClick={sendAddRequest}>✔</button>
          </div>
        </td>
      </tr>
    </table>
  );

  async function DeleteItem(e) {
    let response = await api.delete(`/api/v1/investments/?id=${e.target.id}`);
    getData();
  }

  function showInputFields() {
    const inputFields = document.querySelectorAll(".add__element");
    inputFields.forEach((field) => {
      field.classList.add("active");
      field.classList.remove("hidden");
    });
    document.querySelector(".plus_btn").classList.remove("active");
    document.querySelector(".plus_btn").classList.add("hidden");
  }

  function hideInputFields() {
    const inputFields = document.querySelectorAll(".add__element");
    inputFields.forEach((field) => {
      if (field.tagName == "input") {
        field.setAttribute("value", "");
      }
      field.classList.add("hidden");
      field.classList.remove("active");
    });
    document.querySelector(".plus_btn").classList.remove("hidden");
    document.querySelector(".plus_btn").classList.add("active");
    setNewItem(initialState);
  }
}
export default Portfolio;
