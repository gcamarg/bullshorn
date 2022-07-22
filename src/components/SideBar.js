import React, { useEffect, useState } from "react";
import "./SideBar.css";
import ListItem from "./ListItem";
import { useMarketSymbolState } from "../Contexts/stateProvider";
import api from "../utils/api";

function SideBar() {
  const { symbolRelation, setSymbolRelation } = useMarketSymbolState();
  const [symbolList, setSymbolList] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get(`/api/v1/marketdata/${symbolRelation[0]}`);
      setSymbolList(res.data);
    };
    fetchData();
  }, [symbolRelation[0]]);

  function OptionsMapper() {
    return symbolList.map((elem) => {
      return (
        <div className="listItem" key={elem.displaySymbol}>
          <a
            className={`listItem__text ${
              symbolRelation[1] == elem.displaySymbol ? "itemActive" : ""
            }`}
            onClick={() => {
              setSymbolRelation([
                symbolRelation[0],
                elem.displaySymbol,
                symbolRelation[2],
              ]);
            }}
          >
            {elem.displaySymbol}
          </a>
        </div>
      );
    });
  }

  return (
    <div className="sidebar">
      <div className="marketOptions">
        <a
          className={`marketOptions__text ${
            symbolRelation[0] == "stock" ? "itemActive" : ""
          }`}
          onClick={() => {
            setSymbolRelation(["stock", symbolRelation[1], symbolRelation[2]]);
          }}
        >
          Stock
        </a>
        <a
          className={`marketOptions__text ${
            symbolRelation[0] == "crypto" ? "itemActive" : ""
          }`}
          onClick={() => {
            setSymbolRelation(["crypto", symbolRelation[1], symbolRelation[2]]);
          }}
        >
          Crypto
        </a>
      </div>
      <nav className="sidebar__nav">{symbolList && <OptionsMapper />}</nav>
    </div>
  );
}

export default SideBar;
