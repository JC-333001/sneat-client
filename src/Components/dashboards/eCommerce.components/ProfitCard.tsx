import React from "react";
import DoubleBarChart from "../../echarts.components/DoubleBarChart.tsx";
import { Box, Typography } from "@mui/material";
export default function ProfitCard() {
  return (
    <Box height={"150px"}>
      <Box textAlign={"left"} marginLeft='0.5rem'>
        <Typography variant='subtitle1' gutterBottom>
          Profit
        </Typography>
        <Typography
          variant='h2'
          gutterBottom
          sx={{
            fontSize: "1.5rem",
            fontWeight: "500",
            color: "text.primary",
          }}
        >
          $624k
        </Typography>
      </Box>
      <DoubleBarChart />
    </Box>
  );
}
