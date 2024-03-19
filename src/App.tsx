import React from "react";
import "./App.css";
import Chart from "./components/Chart";
import { wineData } from "./static/wineData";

function App() {

  // Extract Flavanoids data from wineData and store as an array
  const flavanoids: (string | number)[] = wineData.map(
    (wine) => wine.Flavanoids
  );

  // Extract Ash data from wineData and store as an array
  const Ash: (string | number)[] = wineData.map((wine) => wine.Ash);

// Create an object to store minimum Magnesium value for each Alcohol category
  const alcoholCategories:{ [alcoholCategory: string]: number } = {};
  wineData.forEach((entry:any) => {
    const alcoholCategory = entry.Alcohol;
    const magnesiumValue = parseFloat(entry.Magnesium);
    // If alcohol category doesn't exist in alcoholCategories or current magnesium value is less, update
    if (!alcoholCategories[alcoholCategory] || magnesiumValue < alcoholCategories[alcoholCategory]) {
      alcoholCategories[alcoholCategory] = magnesiumValue;
    }
  });

  // Configuration for the line chart
  const lineChart = {
    xAxis: {
      type: "value",
      name: "Flavanoids",
    },
    yAxis: {
      type: "value",
      name: "Ash",
    },
    // Data for the line chart, representing Flavanoids and Ash values
    data: flavanoids.map((value, index) => [value, Ash[index]]),
    type: "line",
  };

  // Configuration for the bar chart
  const barChart = {
    xAxis: {
      type: "category",
      data: Object.keys(alcoholCategories),
      name: "Alchohol",
    },
    yAxis: {
      type: "value",
      name: "Minimum Magnesium Value"
    },
    // Data for the bar chart, representing minimum Magnesium values
    data: Object.values(alcoholCategories),
    type: "bar",
  };
  return (
    <div className="App">
      <div className="lineChart">
        <div className="heading">LINE CHART</div>
        <Chart chart={lineChart} />
      </div>
      <div className="barchart">
        <div className="heading">BAR CHART</div>
        <Chart chart={barChart} />
      </div>
    </div>
  );
}

export default App;
