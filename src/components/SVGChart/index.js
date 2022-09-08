import React, { useState } from "react";
import "./style.css";

export default function SVGChart(obj) {
  const data = obj.data;
  const padding = 50;
  const height = 500 + padding;
  const width = 1000;
  const dataLength = data.length;
  const [scale, setScale] = useState(Math.ceil(dataLength / 50));
  const chartHeight = 500;
  const chartWidth = scale * 1000;
  const candleWidth = chartWidth / dataLength;
  let viewBox = {
    x: chartWidth * (1 - 1 / scale),
    y: 0,
    width: width,
    height: height,
  };

  const yMinMax = minMax();
  const yMin = yMinMax[0];
  const yMax = yMinMax[1];
  const yRange = yMax - yMin;
  const xMin = data[0].date;
  const xMax = data[dataLength - 1].date;
  //const deltaT = Math.ceil((xMax - xMin) / dataLength);
  const xRange = (xMax - xMin) * (1 + 1 / dataLength);
  //const xLength = xRange; //assuming data comes ordered
  const [localMinMax, setLocalMinMax] = useState([...yMinMax]);

  function minMax() {
    let min = data[0].low,
      localMin = data[dataLength - 1].low;
    let max = 0,
      localMax = 0;
    for (let i = 0; i < dataLength; i++) {
      // if (dataLength - i < 50) {
      if (data[i].low < localMin) {
        localMin = data[i].low;
      }
      if (data[i].high > localMax) {
        localMax = data[i].high;
      }
      // }
      min = min > data[i].low ? data[i].low : min;
      max = max > data[i].high ? max : data[i].high;
    }
    return [min, max, localMin, localMax];
  }

  const Candles = () => {
    return data.map((p, idx) => {
      // const xPos = candleWidth/2 + ((p.date-xMin)/xLength)*chartWidth;
      const xPos = candleWidth / 2 + (idx / dataLength) * chartWidth;
      let color, bottomRef, topRef;

      if (p.close > p.open) {
        bottomRef = p.open;
        topRef = p.close;
        color = "blue";
      } else {
        bottomRef = p.close;
        topRef = p.open;
        color = "red";
      }
      const yPos = chartHeight - ((topRef - yMin) / yRange) * chartHeight;
      const candleHeight = Math.abs(
        ((p.close - p.open) / yRange) * chartHeight
      );
      const upperShadow =
        chartHeight - ((p.high - yMin) / yRange) * chartHeight;
      const bottomShadow =
        chartHeight - ((p.low - yMin) / yRange) * chartHeight;

      return (
        <React.Fragment key={p.date}>
          {/* {idx>0?(p.date-data[idx-1].date>deltaT?<polyline points={`${xPos-(candleWidth/2)}, 0, ${xPos-(candleWidth/2)},${height}`} stroke='red' strokeDasharray='2'/>:''):''} */}
          <polyline
            fill="none"
            stroke="#000"
            strokeWidth="1"
            points={`${xPos},${upperShadow} ${xPos},${yPos}`}
          />
          <rect
            x={`${xPos - candleWidth / 2}`}
            y={`${yPos}`}
            width={candleWidth}
            height={candleHeight}
            style={{ fill: `${color}` }}
          />
          <polyline
            fill="none"
            stroke="#000"
            strokeWidth="1"
            points={`${xPos},${yPos + candleHeight} ${xPos},${bottomShadow}`}
          />
        </React.Fragment>
      );
    });
  };
  const XAxis = () => {
    return (
      <polyline
        key="x-axis"
        fill="none"
        stroke="#000"
        strokeWidth="1"
        points={`${0},${chartHeight} ${
          chartWidth + candleWidth
        },${chartHeight}`}
      />
    );
  };
  const MinMaxLine = () => {
    const [min, max] = [
      chartHeight * (1 - (localMinMax[2] - localMinMax[0]) / yRange),
      chartHeight * (1 - (localMinMax[3] - localMinMax[0]) / yRange),
    ];
    return (
      <React.Fragment>
        <line
          x1="0"
          y1={`${min}`}
          x2={`${chartWidth}`}
          y2={`${min}`}
          stroke="red"
          strokeDasharray="2"
        />
        <line
          x1="0"
          x2={`${chartWidth}`}
          y1={`${max}`}
          y2={`${max}`}
          stroke="blue"
          strokeDasharray="2"
        />
      </React.Fragment>
    );
  };
  const XLabel = () => {
    const nL = Math.round(10 * scale);
    const candlesPerLabel = Math.floor(dataLength / nL);
    const nLabels = Math.floor(dataLength / candlesPerLabel);
    const options = {
      month: "numeric",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
      timeZone: "America/Sao_Paulo",
    };
    let xLabelElements = [];
    for (let j = 0; j < nLabels; j++) {
      const d = new Date(data[j * candlesPerLabel].date * 1000);
      const date = new Intl.DateTimeFormat("pt-BR", options).format(d); //`${d.getDay()}/${new Intl.DateTimeFormat('en-US', { month: 'long'}).format(d)} ${d.getHours()}:${d.getMinutes()}`;
      xLabelElements.push(
        <React.Fragment key={`vgrid${j}`}>
          <polyline
            fill="none"
            stroke="#bbb"
            strokeWidth="1"
            points={`${candleWidth / 2 + j * candlesPerLabel * candleWidth},${
              height - padding
            } ${candleWidth / 2 + j * candlesPerLabel * candleWidth},0`}
          />
          <text
            x={`${j * candlesPerLabel * candleWidth}`}
            y={`${height - padding / 2}`}
            transform={`rotate(10,${j * candlesPerLabel * candleWidth},${
              height - padding / 2
            })`}
          >
            {date}{" "}
          </text>
        </React.Fragment>
      );
    }
    return xLabelElements.map((el) => {
      return el;
    });
  };
  const YAxis = () => {
    return (
      <rect
        key="y-axis"
        x="0"
        y="0"
        width={padding}
        height={height}
        style={{ fill: "white" }}
      />
    );
  };
  const YLabel = () => {
    const deltaY = yRange / 10;
    const yLabelElements = [];
    for (let i = 0; i < 10; i++) {
      const Y = chartHeight * (1 - (i * deltaY) / yRange);
      yLabelElements.push(
        <React.Fragment key={Y}>
          <line x1="0" x2={`${padding}`} y1={`${Y}`} y2={`${Y}`} stroke="red" />
          <text x="0" y={`${Y - 5}`} fontSize="0.7em">
            {parseFloat(yMin + i * deltaY).toFixed(2)}{" "}
          </text>
        </React.Fragment>
      );
    }
    return yLabelElements.map((el) => {
      return el;
    });
  };

  function handleZoom(e) {
    if (e.deltaY > 0) {
      if (width >= 0.5 * chartWidth) {
        console.log("Max zoom out.");
        return;
      }
    } else if (width / candleWidth < 20) {
      console.log("Max zoom in.");
      return;
    }
    const sFactor = e.deltaY > 0 ? 0.5 : 2;
    const exp = e.deltaY > 0 ? -1 : 1;
    const _SVG = document.querySelector("svg");
    const vb = _SVG
      .getAttribute("viewBox")
      .split(" ")
      .map((e) => +e);
    const pos_x = (width * exp) / 2 + vb[0] * Math.pow(2, exp);
    _SVG.setAttribute(
      "viewBox",
      `${pos_x < 0 ? 0 : pos_x} ${vb[1]} ${vb[2]} ${vb[3]}`
    );
    setScale(scale * sFactor);
  }
  function Pan(e) {
    const _SVG = document.querySelector("svg");
    const vb = _SVG.getAttribute("viewBox").split(" ");
    const xPan = vb[0] - e.movementX;
    if (e.movementX > 0 && xPan <= 0) {
      return;
    }
    if (e.movementX < 0 && xPan >= chartWidth - width) {
      return;
    }
    // viewBox.x=xPan;
    // setViewBox({...viewBox, x:(viewBox.x-e.movementX)}); //can I do that?
    // if(viewBox.x%candleWidth === 0 ){
    //     const pos_x= +_SVG.getAttribute('viewBox').split(' ')[0]
    //     const idx = Math.ceil(pos_x/candleWidth)
    //     if(data[idx].low<localMinMax[2]){
    //         setLocalMinMax([localMinMax[0],localMinMax[1],data[idx].low,localMinMax[3]])
    //     }
    //     if(data[idx].high>localMinMax[3]){
    //         setLocalMinMax([localMinMax[0],localMinMax[1],localMinMax[2],data[idx].high])
    //     }
    // }
    _SVG.setAttribute("viewBox", `${xPan} ${vb[1]} ${vb[2]} ${vb[3]}`);
  }
  function removePan(e) {
    // const _SVG=document.querySelector('svg');
    const _SVG = e.target;
    _SVG.style.cursor = "crosshair";
    _SVG.removeEventListener("mousemove", Pan);
    _SVG.removeEventListener("mouseleave", removePan);
    _SVG.removeEventListener("mouseup", removePan);
  }
  function handlePan(e) {
    e.preventDefault();
    const _SVG = e.target;
    _SVG.style.cursor = "grab";
    _SVG.addEventListener("mousemove", Pan);
    _SVG.addEventListener("mouseup", removePan);
    _SVG.addEventListener("mouseleave", removePan);
  }

  return (
    <>
      <div className="chartComponents">
        <svg
          key="svg1"
          width="95%"
          viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
          onWheel={(e) => handleZoom(e)}
          onMouseDown={(e) => handlePan(e)}
          style={{ backgroundColor: "white", cursor: "crosshair" }}
        >
          <Candles />
          <XAxis />
          <XLabel />
          {/* <MinMaxLine /> */}
        </svg>
        <svg
          key="svg2"
          id="y-axis"
          width="4.75%"
          viewBox={`0 0 ${padding} ${height}`}
        >
          <YAxis />
          <YLabel />
        </svg>
      </div>
    </>
  );
}
