import React, { useState } from "react";
import Chart from "./Chart";
import SideBar from "./SideBar";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <main className="mainContainer">
        <SideBar />
        <Chart />
      </main>
    </div>
  );
}

export default Home;
