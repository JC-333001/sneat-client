import React from "react";
import LineChart from "../../echarts.components/LineChart.tsx";
import { Box, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

export default function OrderSum() {
  return (
    <Box sx={{ height: "150px" }}>
      <Box textAlign={"left"} marginLeft={"0.5rem"}>
        <Typography variant='subtitle1' gutterBottom>
          Order
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
          256k
        </Typography>
      </Box>
      <LineChart showEnd={true} />
    </Box>
  );
}
