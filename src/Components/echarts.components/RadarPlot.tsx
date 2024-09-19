import React, { useEffect } from "react";
import * as echarts from "echarts";

const RadarPlot: React.FC = () => {
  useEffect(() => {
    const chartDom = document.getElementById("radar-chart")!;
    const myChart = echarts.init(chartDom);

    const option: echarts.EChartsOption = {
      radar: {
        // Decrease the size of the radar chart
        radius: "60%", // Adjust radius to make radar chart smaller
        indicator: [
          { name: "Jan", max: 10000 },
          { name: "Feb", max: 10000 },
          { name: "Mar", max: 10000 },
          { name: "Apr", max: 10000 },
          { name: "May", max: 10000 },
          { name: "Jun", max: 10000 },
        ],
        splitLine: {
          show: false, // Hide the split lines
        },
        splitArea: {
          show: false, // Hide split area colors
        },
        axisLine: {
          lineStyle: {
            color: "#BABFC8", // Light grey color for the axis
          },
        },
      },
      series: [
        {
          name: "Income vs Earnings",
          type: "radar",
          areaStyle: {},
          data: [
            {
              value: [8000, 7000, 6000, 5000, 8000, 7000],
              name: "Income",
              itemStyle: {
                color: "#6A6CFF", // Custom color for Income
              },
              areaStyle: {
                opacity: 0.8, // Increase opacity for better visibility
              },
            },
            {
              value: [6000, 5000, 8000, 4000, 6000, 5000],
              name: "Earning",
              itemStyle: {
                color: "#3AB1F8", // Custom color for Earnings
              },
              areaStyle: {
                opacity: 0.6, // Lower opacity for better contrast
              },
            },
          ],
        },
      ],
      legend: {
        data: ["Income", "Earning"],
        bottom: "5", // Position legend at the bottom with padding
        left: "center",
        icon: "circle",
        itemWidth: 10, // Set the width of the legend icons
        itemHeight: 10, // Set the height of the legend icons
        textStyle: {
          fontSize: 12, // Maintain font size for the legend
          color: "#AEB4BE", // Light grey color for legend text
        },
      },
      grid: {
        bottom: "10%", // Ensuring the plot has space from the bottom
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

  return <div id='radar-chart' style={{ width: "100%", height: "300px" }} />;
};

export default RadarPlot;
