import React from "react";
import RadarPlot from "../../echarts.components/RadarPlot.tsx";
import { Box, Typography } from "@mui/material";
export default function PerformanceCard() {
  return (
    <Box>
      <Box textAlign={"left"} marginLeft={"0.5rem"}>
        <Typography variant='h6' color='text.primary'>
          Performance
        </Typography>
        <Box textAlign={"left"} display={"flex"} justifyContent={"start"}>
          <Typography
            variant='h2'
            sx={{
              fontSize: "0.8rem",
              fontWeight: "400",
              color: "text.secondary",
              marginRight: "0.5rem",
            }}
          >
            Earning: $846.17
          </Typography>
          <Typography
            variant='h2'
            sx={{
              fontSize: "0.8rem",
              fontWeight: "400",
              color: "text.secondary",
            }}
          >
            Sales: 25.7M
          </Typography>
        </Box>
      </Box>
      <RadarPlot />
    </Box>
  );
}
