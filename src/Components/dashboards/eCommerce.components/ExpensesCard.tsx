import React from "react";
import DoubleBarChart from "../../echarts.components/DoubleBarChart.tsx";
import GrowthGaugeChart from "../../echarts.components/GrowthGaugeChart.tsx";
import { Box, Typography } from "@mui/material";
export default function ExpensesCard() {
  return (
    <Box height={"150px"}>
      <Box textAlign={"left"} marginLeft='0.5rem'>
        <Typography variant='subtitle1' gutterBottom>
          Expenses
        </Typography>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <GrowthGaugeChart
          growthValue={72}
          chartName=''
          barWidth={10}
          chartSize='100px'
          offset={["0%", "-20%"]}
        />
        <Typography
          variant='subtitle1'
          color='text.secondary'
          fontSize={12}
          position={"relative"}
          top={"-20px"}
        >
          $2k Expenses more than last month
        </Typography>
      </Box>
    </Box>
  );
}
