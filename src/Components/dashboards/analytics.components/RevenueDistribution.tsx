import React from "react";
import SimpleBarChart from "../../echarts.components/SimpleBarChart.tsx";
import { Box, Typography } from "@mui/material";
export default function RevenueDistribution() {
  return (
    <Box height={"150px"}>
      <Box textAlign={"left"} marginLeft='0.5rem'>
        <Typography variant='subtitle1' gutterBottom>
          Revenue
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
          425k
        </Typography>
      </Box>
      <SimpleBarChart />
    </Box>
  );
}
