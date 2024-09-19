import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { EChartsOption } from "echarts";

const StackedLineChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);

      const option: EChartsOption = {
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          top: "10%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          axisLabel: {
            color: "#AEB4BE",
            fontSize: 14,
          },
          axisLine: {
            show: false, // Hide x-axis line
          },
          axisTick: {
            show: false, // Hide x-axis ticks
          },
          splitLine: {
            show: false, // Hide grid lines on x-axis
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            color: "#AEB4BE",
            fontSize: 14,
            formatter: (value: number) => `$${value / 1000}k`,
          },
          splitLine: {
            lineStyle: {
              color: "#F0F0F0",
            },
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
          },
        },
        series: [
          {
            name: "Sales",
            type: "line",
            smooth: false, // Set smooth to false for straight lines
            symbol: "circle", // Display data points
            symbolSize: 8, // Size of the data points
            lineStyle: {
              color: "#6A6CFF",
              width: 4,
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(106, 108, 255, 0.6)", // Top gradient
                  },
                  {
                    offset: 1,
                    color: "rgba(106, 108, 255, 0)", // Bottom gradient
                  },
                ],
              },
            },
            data: [
              3000, 4200, 3500, 3000, 2900, 3000, 3800, 3500, 3600, 4500, 6000,
              6500,
            ],
          },
        ],
      };

      myChart.setOption(option);

      // ResizeObserver to handle chart resize
      const resizeObserver = new ResizeObserver(() => {
        myChart.resize();
      });

      resizeObserver.observe(chartRef.current);

      return () => {
        resizeObserver.disconnect();
        myChart.dispose();
      };
    }
  }, []);

  return <div ref={chartRef} style={{ width: "100%", height: "290px" }} />;
};

export default StackedLineChart;
