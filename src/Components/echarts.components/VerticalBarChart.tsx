import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { useColorContext } from "../../context/ColorModeContext.tsx";
import { lightGreen } from "@mui/material/colors";

const VerticalBarChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  const { theme } = useColorContext();

  useEffect(() => {
    if (chartRef.current) {
      // Initialize the chart
      chartInstance.current = echarts.init(chartRef.current);

      // Specify the chart options
      const option: echarts.EChartsOption = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: ["2023", "2024"], // Removed 'Profit' from legend
          left: "20px", // Position the legend to the left
          top: "top", // Position the legend to the top
          icon: "circle",
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category", // Swapped from 'value' to 'category'
            axisTick: {
              show: false,
            },
            data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
          },
        ],
        yAxis: [
          {
            type: "value", // Swapped from 'category' to 'value'
            splitLine: { show: false }, // Hide grid lines
          },
        ],
        series: [
          {
            name: "2023",
            type: "bar",
            stack: "Total",
            barWidth: "20%",
            itemStyle: {
              borderRadius: [10, 10, 10, 10], // Rounded top corners
              color: "#6A6CFF",
            },
            label: {
              show: false,
            },
            emphasis: {
              focus: "series",
            },
            data: [320, 302, 341, 374, 390, 450, 420],
          },
          {
            name: "2024",
            type: "bar",
            stack: "Total",
            label: {
              show: false,
              //   position: "left",
            },
            emphasis: {
              focus: "series",
            },
            itemStyle: {
              borderRadius: [10, 10, 10, 10], // Rounded top corners
              color: lightGreen[400],
            },
            data: [-120, -132, -101, -134, -190, -230, -210],
          },
        ],
      };
      let resizeTimeout;
      // Set the chart option
      chartInstance.current.setOption(option);

      // Create a ResizeObserver
      const resizeObserver = new ResizeObserver((entries) => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          for (let entry of entries) {
            chartInstance.current?.resize();
          }
        }, 100); // Debounce delay (100 ms in this case)
      });

      // Start observing the chart container
      resizeObserver.observe(chartRef.current);
      return () => {
        chartInstance.current?.dispose();
        resizeObserver.disconnect();
        // window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <div
      ref={chartRef}
      style={{
        width: "100%",
        height: "250px",
      }}
    />
  );
};

export default VerticalBarChart;
