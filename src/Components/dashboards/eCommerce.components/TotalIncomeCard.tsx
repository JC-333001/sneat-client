import React from "react";
import StackedLineChart from "../../echarts.components/StackedLineChart.tsx";
import { Typography, Box } from "@mui/material";

export default function TotalIncomeCard() {
  return (
    <Box>
      <Box textAlign={"left"} marginLeft={"0.5rem"}>
        <Typography
          variant='h2'
          gutterBottom
          sx={{
            fontSize: "1.2rem",
            fontWeight: "500",
            color: "text.primary",
            textAlign: "left",
          }}
        >
          Total Income
        </Typography>
        <Typography
          variant='h2'
          sx={{
            fontSize: "0.8rem",
            fontWeight: "400",
            color: "text.secondary",
          }}
        >
          Yearly report overview
        </Typography>
      </Box>
      <StackedLineChart />
    </Box>
  );
}
