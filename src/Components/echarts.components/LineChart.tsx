import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { useColorContext } from "../../context/ColorModeContext.tsx";

// Define the props type
interface LineChartProps {
  showEnd?: boolean;
  color?: string;
  lineData?: any;
  xAxisData?: any;
  plotHeight?: number;
  gridOpen?: boolean;
  colorStyle?: any;
}

const LineChart: React.FC<LineChartProps> = ({
  showEnd = true,
  color = "green",
  lineData = [
    ["2019-10-10", 200],
    ["2019-10-11", 560],
    ["2019-10-12", 750],
    ["2019-10-13", 580],
    ["2019-10-14", 250],
    ["2019-10-15", 300],
    ["2019-10-16", 450],
    ["2019-10-17", 300],
    ["2019-10-18", 100],
  ],
  xAxisData = null,
  plotHeight = 100,
  gridOpen = false,
  colorStyle = "area",
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const { theme } = useColorContext();

  const { mainColor, lightColor } =
    color == "orange"
      ? {
          mainColor: theme.palette.info.main,
          lightColor: theme.palette.info.light,
        }
      : {
          mainColor: theme.palette.success.main,
          lightColor: theme.palette.success.light,
        };

  useEffect(() => {
    if (chartRef.current) {
      // Initialize the chart
      const myChart = echarts.init(chartRef.current);
      // console.log(lineData);

      // Specify the chart options
      const option: echarts.EChartsOption = {
        grid: gridOpen
          ? {
              top: 0,
              bottom: 0,
              left: 15,
              right: 15,
              containLabel: true,
            }
          : {
              top: 5,
              bottom: 35,
            },
        xAxis: xAxisData
          ? {
              type: "category",
              boundaryGap: false,
              data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], // X-axis labels
              axisLabel: {
                color: "#AEB4BE", // Light grey color for labels
                fontSize: 14,
              },
              axisLine: {
                show: false,
              },
              axisTick: {
                show: false, // Hide x-axis tick marks
              },
              splitLine: {
                show: false,
              },
            }
          : {
              type: "category",
              boundaryGap: false,
              show: false,
            },
        yAxis: {
          type: "value",
          boundaryGap: [0, "30%"],
          show: false,
        },
        series: [
          {
            type: "line",
            smooth: 0.6,
            symbol: "none",
            lineStyle: {
              color: mainColor,
              width: 3,
            },

            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,

                colorStops:
                  colorStyle == "area"
                    ? [
                        {
                          offset: 0,
                          color: mainColor, // Green at the top
                        },
                        {
                          offset: 1,
                          color: lightColor, // Transparent at the bottom
                        },
                      ]
                    : [],
              },
            },
            data: lineData,
            ...(showEnd
              ? {
                  markPoint: {
                    data: [
                      {
                        name: "Last Point",
                        coord: [
                          lineData[lineData.length - 1][0],
                          lineData[lineData.length - 1][1],
                        ],
                        symbol: "circle",
                        symbolSize: 10,
                        itemStyle: {
                          color: "white",
                          borderColor: mainColor,
                          borderWidth: 4,
                        },
                      },
                    ],
                  },
                }
              : {}),
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
        // window.removeEventListener("resize", handleResize);
      };
    }
  }, [lineData]);

  return (
    <div
      ref={chartRef}
      style={{
        width: "100%",
        height: `${plotHeight}px`,
        margin: "0",
        padding: "0",
      }}
    />
  );
};

export default LineChart;
