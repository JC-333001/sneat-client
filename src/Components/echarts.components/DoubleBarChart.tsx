import React, { useEffect } from "react";
import * as echarts from "echarts";
import { EChartsOption } from "echarts";

const DoubleBarChart: React.FC = () => {
  useEffect(() => {
    const chartDom = document.getElementById("custom-bar-chart")!;
    const myChart = echarts.init(chartDom);

    const option: EChartsOption = {
      xAxis: {
        type: "category",
        data: ["Jan", "Apr", "Jul", "Oct"],
        axisLabel: {
          color: "#AEB4BE", // Grey color for labels
          fontSize: 12, // Adjust font size for smaller height
        },
        axisLine: {
          show: false, // Hide the x-axis line
        },
        axisTick: {
          show: false, // Hide the x-axis ticks
        },
      },
      yAxis: {
        type: "value",
        show: false, // Hide the y-axis completely
      },
      series: [
        {
          type: "bar",
          data: [100, 60, 100, 120], // Dark bar data
          barWidth: 10, // Thinner bars
          itemStyle: {
            color: "#78D068", // Dark green for main bars
            borderRadius: [5, 5, 5, 5], // Rounded top corners
          },
        },
        {
          type: "bar",
          data: [70, 40, 80, 90], // Light bar data
          barWidth: 10, // Thinner bars
          itemStyle: {
            color: "rgba(120, 208, 104, 0.3)", // Light green with opacity
            borderRadius: [5, 5, 5, 5], // Rounded top corners
          },
        },
      ],
      grid: {
        left: "0%", // Adjust grid to fit the design
        right: "0%",
        bottom: "30%", // Increase bottom to give space for labels
        top: "10%",
      },
    };

    // Set the chart option
    myChart.setOption(option);
    let resizeTimeout;
    // Create a ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        for (let entry of entries) {
          myChart.resize();
        }
      }, 100); // Debounce delay (100 ms in this case)
    });

    // Start observing the chart container
    resizeObserver.observe(chartDom);

    // Cleanup on component unmount
    return () => {
      myChart.dispose();
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div id='custom-bar-chart' style={{ width: "100%", height: "80px" }} />
  );
};

export default DoubleBarChart;
