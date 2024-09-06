import React from "react";
import { Box, Typography, Chip } from "@mui/material";
import LineChart from "../../echarts.components/LineChart.tsx";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

export default function ProfitReport() {
  return (
    <Box display={"flex"} justifyContent={"space-around"} alignItems={"center"}>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        alignItems={"start"}
      >
        <Typography
          variant='h2'
          gutterBottom
          sx={{
            fontSize: "1.2rem",
            fontWeight: "500",
            color: "text.primary",
            textAlign: "left",
          }}
          noWrap={true}
        >
          Profit Report
        </Typography>
        <Chip
          label='Year 2024'
          sx={{
            borderRadius: "5px",
            color: "info.main",
            bgcolor: "info.light",
          }}
        />
        <Typography
          variant='subtitle2'
          gutterBottom
          sx={{ color: "success.main", position: "relative", top: "-5px" }}
        >
          <ArrowUpwardIcon sx={{ position: "relative", top: "5px" }} />
          28.14%
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
          $84,686k
        </Typography>
      </Box>
      <Box width={"60%"}>
        <LineChart showEnd={false} color={"orange"} />
      </Box>
    </Box>
  );
}
