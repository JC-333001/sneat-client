import React from "react";
import LineChart from "../../echarts.components/LineChart.tsx";
import { Box, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

export default function ActivityCard() {
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
          Activity
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
          82%
        </Typography>

        <Typography
          variant='subtitle2'
          gutterBottom
          sx={{ color: "success.main", position: "relative", top: "-5px" }}
        >
          <ArrowUpwardIcon sx={{ position: "relative", top: "5px" }} />
          19.6%
        </Typography>
      </Box>
      <Box width={"60%"} height={"100%"}>
        <LineChart
          showEnd={false}
          lineData={[
            ["2019-10-10", 200],
            ["2019-10-11", 560],
            ["2019-10-12", 1750],
            ["2019-10-13", 1580],
            ["2019-10-14", 1250],
            ["2019-10-15", 1300],
            ["2019-10-16", 450],
            ["2019-10-17", 300],
            ["2019-10-18", 2100],
            ["2019-10-18", 2200],
          ]}
        />
      </Box>
    </Box>
  );
}
