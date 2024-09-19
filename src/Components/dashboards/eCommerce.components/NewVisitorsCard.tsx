import React from "react";
import { Box, Typography, Chip } from "@mui/material";
import BasicBarChart from "../../echarts.components/BasicBarChart.tsx";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export default function NewVisitorsCard() {
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
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
            marginBottom: "2.5rem",
          }}
          noWrap={true}
        >
          New Visitors
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
          23%
        </Typography>

        <Typography
          variant='subtitle2'
          gutterBottom
          sx={{ color: "warn", position: "relative", top: "-5px" }}
        >
          <ArrowDownwardIcon sx={{ position: "relative", top: "5px" }} />
          8.75%
        </Typography>
      </Box>
      <Box width={"60%"} height={"100%"}>
        <BasicBarChart />
      </Box>
    </Box>
  );
}
