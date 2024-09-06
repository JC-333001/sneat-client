import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { useColorContext } from "../../context/ColorModeContext.tsx";

const SimpleBarChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const { theme } = useColorContext();

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);

      const option: echarts.EChartsOption = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "0%",
          right: "0%",
          top: "0%",
          bottom: "0%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: ["M", "T", "W", "T", "F", "S", "S"],
            axisTick: {
              alignWithLabel: true,
              show: false, // Hide axis ticks
            },
            axisLine: {
              show: false, // Hide axis line
            },
            axisLabel: {
              show: true, // Keep x-axis labels visible
              color: "#333", // Customize the color of the x-axis labels
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              show: false, // Hide axis line
            },
            axisTick: {
              show: false, // Hide axis ticks
            },
            splitLine: {
              show: false, // Hide grid lines
            },
            axisLabel: {
              show: false, // Hide y-axis labels
            },
          },
        ],
        series: [
          {
            name: "Direct",
            type: "bar",
            barWidth: "80%",
            data: [
              {
                value: 10,
                itemStyle: { color: theme.palette.primary.light }, // Dimmed style
              },
              {
                value: 100,
                itemStyle: { color: theme.palette.primary.light }, // Dimmed style
              },
              {
                value: 200,
                itemStyle: { color: theme.palette.primary.light }, // Dimmed style
              },
              {
                value: 500,
                itemStyle: { color: theme.palette.primary.light }, // Dimmed style
              },
              {
                value: 800,
                itemStyle: { color: theme.palette.primary.main }, // Highlighted Friday
              },
              {
                value: 200,
                itemStyle: { color: theme.palette.primary.light }, // Dimmed style
              },
              {
                value: 220,
                itemStyle: { color: theme.palette.primary.light }, // Dimmed style
              },
            ],
            itemStyle: {
              borderRadius: [0, 0, 0, 0], // No rounding on any corner
            },
          },
        ],
      };

      myChart.setOption(option);

      // Cleanup on component unmount
      return () => {
        myChart.dispose();
      };
    }
  }, []);

  return (
    <div
      ref={chartRef}
      style={{
        width: "100%",
        height: "80px",
        margin: "0",
        padding: "0",
      }}
    />
  );
};

export default SimpleBarChart;
