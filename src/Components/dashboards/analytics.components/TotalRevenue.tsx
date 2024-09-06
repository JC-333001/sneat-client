import React from "react";
import { Box, ThemeProvider, Typography } from "@mui/material";
import VerticalBarChart from "../../echarts.components/VerticalBarChart.tsx";

export default function TotalRevenue() {
  return (
    <Box height={"320px"}>
      <Typography
        variant='h2'
        gutterBottom
        sx={{
          fontSize: "1.2rem",
          fontWeight: "500",
          color: "text.primary",
          textAlign: "left",
          position: "relative",
          left: "20px",
        }}
      >
        Total Revenue
      </Typography>
      <VerticalBarChart />
    </Box>
  );
}
