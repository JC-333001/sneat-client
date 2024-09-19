import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { useColorContext } from "../../context/ColorModeContext.tsx";

interface GrowthGaugeChartProps {
  growthValue: number;
  chartName?: string;
  barWidth?: number;
  chartSize?: string;
}

const GrowthGaugeChart: React.FC<GrowthGaugeChartProps> = ({
  growthValue,
  chartName = "Growth",
  barWidth = 20,
  chartSize = "150px",
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const { theme } = useColorContext();

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);

      const option: echarts.EChartsOption = {
        series: [
          {
            type: "gauge",
            startAngle: 180,
            endAngle: 0,
            radius: "90%",
            pointer: {
              show: false,
            },
            progress: {
              show: true,
              overlap: false,
              roundCap: true,
              clip: false,
              itemStyle: {
                color: "#6A6CFF", // Adjust color as needed
              },
            },
            axisLine: {
              lineStyle: {
                width: barWidth,
                color: [
                  [0, "#6A6CFF"], // Progress color
                  [1, "#E9E9E9"], // Background color
                ],
              },
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            data: [
              {
                value: growthValue,
                name: chartName,
                title: {
                  offsetCenter: ["0%", "0%"],
                  fontSize: "14px",
                  color: theme.palette.text.primary,
                },
                detail: {
                  valueAnimation: true,
                  offsetCenter: ["0%", "40%"],
                  fontSize: "20px",
                  fontWeight: "bold",
                  formatter: "{value}%",
                  color: theme.palette.text.primary,
                },
              },
            ],
          },
        ],
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
      resizeObserver.observe(chartRef.current);

      // Cleanup on component unmount
      return () => {
        myChart.dispose();
        resizeObserver.disconnect();
      };
    }
  }, [theme, growthValue]);

  return <div ref={chartRef} style={{ width: chartSize, height: chartSize }} />;
};

export default GrowthGaugeChart;
