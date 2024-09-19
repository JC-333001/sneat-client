import React from "react";
import { Box, Typography, Avatar, Divider, Button } from "@mui/material";
import purpleCard from "../../../img/eCommerce/purple-card.png";
import paypal from "../../../img/eCommerce/paypal.png";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LineChart from "../../echarts.components/LineChart.tsx";
const SalesAnalyticsCard = () => {
  return (
    <Box>
      <Box textAlign={"left"} marginLeft={"0.5rem"}>
        <Typography variant='h6' color='text.primary'>
          Total Balance
        </Typography>
        <Box
          textAlign={"left"}
          display={"flex"}
          justifyContent={"start"}
          marginTop={"0.5rem"}
          position={"relative"}
          top={"1rem"}
        >
          <Box display={"flex"} alignItems={"center"} marginRight={"3rem"}>
            <Avatar
              sx={{ marginBottom: "0.5rem" }}
              variant='square'
              src={purpleCard}
            />
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"start"}
              justifyContent={"center"}
              marginLeft={"0.5rem"}
            >
              <Typography
                variant='body1'
                fontWeight={500}
                color='text.primary'
                textAlign={"left"}
              >
                $2.54k
              </Typography>
              <Typography
                variant='body2'
                color='text.secondary'
                sx={{ fontSize: "0.8rem" }}
                textAlign={"left"}
              >
                Wallet
              </Typography>
            </Box>
          </Box>
          <Box display={"flex"} alignItems={"center"}>
            <Avatar
              sx={{ bgcolor: "#FFE2DD", marginBottom: "0.5rem" }}
              variant='rounded'
              src={paypal}
            />
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"start"}
              justifyContent={"center"}
              marginLeft={"0.5rem"}
            >
              <Typography
                variant='body1'
                fontWeight={500}
                color='text.primary'
                textAlign={"left"}
              >
                $2.54k
              </Typography>
              <Typography
                variant='body2'
                color='text.secondary'
                sx={{ fontSize: "0.8rem" }}
                textAlign={"left"}
              >
                Paypal
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box position={"relative"} right={"1rem"}>
        <LineChart
          color='orange'
          lineData={[
            ["Jan", 200],
            ["Feb", 300],
            ["Mar", 250],
            ["Apr", 500],
            ["May", 700],
            ["Jun", 1000],
          ]}
          xAxisData={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
          plotHeight={200}
          gridOpen={true}
          colorStyle='line'
          showEnd={true}
        />
      </Box>
      <Divider sx={{ marginTop: "1rem", marginBottom: "0.5rem" }} />
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography
          variant='body1'
          color='text.secondary'
          textAlign={"left"}
          fontSize={12}
        >
          You have done 57.6% more sales. Check your new badge in your profile.
        </Typography>
        <Button
          variant='contained'
          sx={{
            color: "#FFAB00",
            backgroundColor: "#FFF2DE",
            "&:hover": {
              backgroundColor: "#FFF2DE",
            },
            boxShadow: "none",
            minWidth: "0!important",
            width: "30px",
            height: "30px",
          }}
        >
          <ArrowForwardIosIcon sx={{ fontSize: "1rem" }} />
        </Button>
      </Box>
    </Box>
  );
};

export default SalesAnalyticsCard;
