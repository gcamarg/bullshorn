import React from "react";
import Chart from "./Chart";
import SideBar from "./SideBar";
import NewsBar from "./NewsBar";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <SideBar />
      <main className="mainContainer">
        <Chart />
        <NewsBar />
      </main>
    </div>
  );
}

export default Home;
