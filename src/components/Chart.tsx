import React from "react";
import ReactECharts from "echarts-for-react";

// Define props interface for the Chart component
interface ChartProps {
  chart: {
    xAxis: {
      type: string;
      name?: string;
      data?: (string | number)[];
    };
    yAxis: {
      type: string;
      name?: string;
      data?: (string | number)[];
    };
    data?: (string | number)[] | (string | number)[][];
    type: string;
  };
}
const Chart: React.FC<ChartProps> = ({ chart }) => {

  // Define ECharts options based on chart prop
  const options = {
    color: ["#b03a5b"],
    grid: { top: 8, right: 10, bottom: 40, left: 40, containLabel:true },
    xAxis: {
      ...chart?.xAxis, // Spread operator to merge custom xAxis properties
      nameLocation: 'center',  // Placing axis name at the center
      nameGap: 30, // Setting gap between axis name and axis line
      nameTextStyle: {
        fontSize: 14,
        fontWeight: "bold",
        verticalAlign: "center",
      },
    },
    yAxis: {
      ...chart?.yAxis, // Spread operator to merge custom yAxis properties
      nameLocation: "center", // Placing axis name at the center
      nameGap: 25, // Setting gap between axis name and axis line
      splitNumber: 8,
      nameTextStyle: {
        fontSize: 14,
        fontWeight: "bold",
        align: "center",
      },
    },
    series: [
      {
        data: chart?.data, // Providing chart data
        type: chart?.type, // Specifying chart type
        barWidth: 40,
        smooth: true,
      },
    ],
    tooltip: {
      trigger: "axis",
    },
  };
  return <ReactECharts option={options} className="app-chart"/>;
};

export default Chart;
