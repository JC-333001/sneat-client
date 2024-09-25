import React from "react";
import Badge from "../Components/dashboards/analytics.components/Badge.tsx";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { useColorContext } from "../context/ColorModeContext.tsx";
import OrderSum from "../Components/dashboards/analytics.components/OrderSum.tsx";
import { Typography } from "@mui/material";
import Sales from "../Components/dashboards/analytics.components/Sales.tsx";
import TotalRevenue from "../Components/dashboards/analytics.components/TotalRevenue.tsx";
import Growth from "../Components/dashboards/analytics.components/Growth.tsx";
import Payments from "../Components/dashboards/analytics.components/Payments.tsx";
import RevenueDistribution from "../Components/dashboards/analytics.components/RevenueDistribution.tsx";
import ProfitReport from "../Components/dashboards/analytics.components/ProfitReport.tsx";
import ActivityTimeline from "../Components/dashboards/analytics.components/ActivityTimeline.tsx";
import VisitDataTbl from "../Components/dashboards/analytics.components/VisitDataTbl.tsx";
import { useMediaQuery } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "background.paper",
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Analytics() {
  const { mode } = useColorContext();
  // Custom media query to change lg to 1400px
  const isLg = useMediaQuery("(min-width:1100px)");
  return (
    <Grid container spacing={2}>
      <Grid xs={12} md={isLg ? 8 : 12}>
        <Item>
          <Badge></Badge>
        </Item>
      </Grid>
      <Grid xs={6} md={isLg ? 2 : 6}>
        <Item>
          <OrderSum />
        </Item>
      </Grid>
      <Grid xs={6} md={isLg ? 2 : 6}>
        <Item>
          <Sales></Sales>
        </Item>
      </Grid>
      <Grid container xs={12} md={isLg ? 8 : 12} spacing={0}>
        <Grid xs={12} md={isLg ? 8 : 12}>
          <Item>
            <TotalRevenue />
          </Item>
        </Grid>
        <Grid xs={12} md={isLg ? 4 : 12}>
          <Item
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Growth />
          </Item>
        </Grid>
      </Grid>
      <Grid container xs={12} md={isLg ? 4 : 12} spacing={2}>
        <Grid xs={6} md={6} height={"150px"}>
          <Item>
            <Payments />
          </Item>
        </Grid>
        <Grid xs={6} md={6}>
          <Item>
            <RevenueDistribution />
          </Item>
        </Grid>
        <Grid xs={12} md={12}>
          <Item>
            <ProfitReport />
          </Item>
        </Grid>
      </Grid>
      <Grid xs={12} md={isLg ? 6 : 12}>
        <Item
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "450px",
          }}
        >
          <ActivityTimeline />
        </Item>
      </Grid>
      <Grid xs={12} md={isLg ? 6 : 12}>
        <Item
          sx={{
            display: "flex",
            alignItems: "center",
            height: "450px",
          }}
        >
          <VisitDataTbl />
        </Item>
      </Grid>
    </Grid>
  );
}
