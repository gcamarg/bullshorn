import React, { useState, useEffect } from "react";
import { server } from "../utils/api";
import SVGChart from "./SVGChart";
import "./Chart.css";
import { useMarketSymbolState } from "../Contexts/stateProvider";

function Chart() {
  const [data, setData] = useState(null);
  const { symbolRelation, setSymbolRelation } = useMarketSymbolState();

  useEffect(() => {
    setData(null);

    const fetchData = async () => {
      const res = await server.get(
        `/api/v1/marketdata/${symbolRelation[0]}/${
          symbolRelation[2]
        }/${symbolRelation[1].replace("/", "")}`
      );
      setData(res.data);
    };
    fetchData().catch(console.error);
  }, [symbolRelation[1], symbolRelation[2]]);

  return (
    <div className="chartArea">
      {data == null ? (
        <h2>{`Loading data for ${symbolRelation[1]} ${symbolRelation[0]}...`}</h2>
      ) : (
        <div className="chartContainer">
          <div className="chartHeaders">
            <ul className="resolutionList">
              <li
                onClick={() => {
                  setSymbolRelation([
                    symbolRelation[0],
                    symbolRelation[1],
                    "60",
                  ]);
                }}
              >
                1h
              </li>
              <li
                onClick={() => {
                  setSymbolRelation([
                    symbolRelation[0],
                    symbolRelation[1],
                    "D",
                  ]);
                }}
              >
                D
              </li>
              <li
                onClick={() => {
                  setSymbolRelation([
                    symbolRelation[0],
                    symbolRelation[1],
                    "W",
                  ]);
                }}
              >
                W
              </li>
            </ul>
            <h3 className="chartName">{symbolRelation[1]}</h3>
          </div>
          <SVGChart data={data} />
        </div>
      )}
    </div>
  );
}

export default Chart;
