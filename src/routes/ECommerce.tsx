import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { useColorContext } from "../context/ColorModeContext.tsx";
import BestSellerCard from "../Components/dashboards/eCommerce.components/BestSellerCard.tsx";
import NewVisitorsCard from "../Components/dashboards/eCommerce.components/NewVisitorsCard.tsx";
import ActivityCard from "../Components/dashboards/eCommerce.components/ActivityCard.tsx";
import ProfitCard from "../Components/dashboards/eCommerce.components/ProfitCard.tsx";
import ExpensesCard from "../Components/dashboards/eCommerce.components/ExpensesCard.tsx";
import TotalIncomeCard from "../Components/dashboards/eCommerce.components/TotalIncomeCard.tsx";
import Sales from "../Components/dashboards/analytics.components/Sales.tsx";
import ReportCard from "../Components/dashboards/eCommerce.components/ReportCard.tsx";
import PerformanceCard from "../Components/dashboards/eCommerce.components/PerformanceCard.tsx";
import ConversionRateCard from "../Components/dashboards/eCommerce.components/ConversionRateCard.tsx";
import SalesAnalyticsCard from "../Components/dashboards/eCommerce.components/SalesAnalyticsCard.tsx";
import TransactionsCard from "../Components/dashboards/eCommerce.components/TransactionsCard.tsx";
import { useMediaQuery } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "background.paper",
  padding: theme.spacing(1.5),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function ECommerce() {
  const { mode } = useColorContext();
  // Custom media query to change lg to 1400px
  const isLg = useMediaQuery("(min-width:1100px)");
  isLg ? console.log("8") : console.log("12");
  return (
    <Grid container spacing={2}>
      <Grid xs={12} md={isLg ? 4 : 12}>
        <Item>
          <BestSellerCard />
        </Item>
      </Grid>
      <Grid container xs={12} md={isLg ? 8 : 12} spacing={0}>
        <Grid xs={6} md={6}>
          <Item>
            <NewVisitorsCard />
          </Item>
        </Grid>
        <Grid xs={6} md={6}>
          <Item>
            <ActivityCard />
          </Item>
        </Grid>
      </Grid>

      <Grid container xs={12} md={isLg ? 4 : 12} spacing={1}>
        <Grid xs={6} md={isLg ? 6 : 3}>
          <Item>
            <Sales />
          </Item>
        </Grid>
        <Grid xs={6} md={isLg ? 6 : 3}>
          <Item>
            <ProfitCard />
          </Item>
        </Grid>
        <Grid xs={6} md={isLg ? 6 : 3}>
          <Item>
            <ExpensesCard />
          </Item>
        </Grid>
        <Grid xs={6} md={isLg ? 6 : 3}>
          <Item>
            <TransactionsCard />
          </Item>
        </Grid>
      </Grid>
      <Grid container xs={12} md={isLg ? 8 : 12} spacing={0}>
        <Grid xs={7} md={7}>
          <Item>
            <TotalIncomeCard />
          </Item>
        </Grid>
        <Grid xs={5} md={5}>
          <Item>
            <ReportCard />
          </Item>
        </Grid>
      </Grid>
      <Grid xs={12} md={isLg ? 4 : 12}>
        <Item>
          <PerformanceCard />
        </Item>
      </Grid>
      <Grid xs={12} md={isLg ? 4 : 12}>
        <Item>
          <ConversionRateCard />
        </Item>
      </Grid>
      <Grid xs={12} md={isLg ? 4 : 12}>
        <Item>
          <SalesAnalyticsCard />
        </Item>
      </Grid>
    </Grid>
  );
}
