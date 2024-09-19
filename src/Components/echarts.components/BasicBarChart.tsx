import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

// Define the ECharts option type for TypeScript
type EChartsOption = echarts.EChartsOption;

const BasicBarChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);

      const option: EChartsOption = {
        grid: {
          left: "3%",
          right: "3%",
          bottom: "5%",
          top: "5%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: "#C0C0C0", // Light grey color for axis label
          },
        },
        yAxis: {
          type: "value",
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 220, 130],
            type: "bar",
            barWidth: "30%",
            itemStyle: {
              borderRadius: [50, 50, 50, 50], // Rounded top corners
              color: (params) => {
                const colors = [
                  "#D6E4FF",
                  "#D6E4FF",
                  "#D6E4FF",
                  "#D6E4FF",
                  "#D6E4FF",
                  "#687DF2",
                  "#D6E4FF",
                ];
                return colors[params.dataIndex];
              },
            },
            emphasis: {
              itemStyle: {
                color: "#687DF2", // Highlight color for the active bar
              },
            },
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
  }, []);

  return <div ref={chartRef} style={{ width: "100%", height: "120px" }} />;
};

export default BasicBarChart;
