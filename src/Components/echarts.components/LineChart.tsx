import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { useColorContext } from "../../context/ColorModeContext.tsx";

// Define the props type
interface LineChartProps {
  showEnd?: boolean;
  color?: string;
}

const LineChart: React.FC<LineChartProps> = ({
  showEnd = true,
  color = "green",
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

      // Specify the chart options
      const option: echarts.EChartsOption = {
        xAxis: {
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
                colorStops: [
                  {
                    offset: 0,
                    color: mainColor, // Green at the top
                  },
                  {
                    offset: 1,
                    color: lightColor, // Transparent at the bottom
                  },
                ],
              },
            },
            data: [
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
            ...(showEnd
              ? {
                  markPoint: {
                    data: [
                      {
                        name: "Last Point",
                        coord: ["2019-10-18", 100],
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

      // Cleanup on component unmount
      return () => {
        myChart.dispose();
      };
    }
  }, []);

  return (
    <div
      ref={chartRef}
      style={{ width: "100%", height: "100px", margin: "0", padding: "0" }}
    />
  );
};

export default LineChart;
