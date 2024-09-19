import React from "react";
import { Box, Grid, Typography, Paper, Avatar, Icon } from "@mui/material";
import { styled } from "@mui/system";
import PayPalIcon from "@mui/icons-material/AccountBalanceWallet"; // Example icon
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import WalletIcon from "@mui/icons-material/Wallet";
import payPal from "../../../img/eCommerce/paypal-primary.png";
import shopBag from "../../../img/eCommerce/shopping-bag.png";
import wallet from "../../../img/eCommerce/wallet-info.png";

// Custom Paper component with padding and rounded corners
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: 15,
  display: "flex",
  alignItems: "center",
}));

// Data for the report items
const reportData = [
  {
    icon: payPal,
    label: "Income",
    amount: "$42,845",
    change: "+2.7k",
    changeColor: "green",
  },
  {
    icon: shopBag,
    label: "Expense",
    amount: "$38,658",
    change: "-1.15k",
    changeColor: "red",
  },
  {
    icon: wallet,
    label: "Profit",
    amount: "$18,220",
    change: "+1.34k",
    changeColor: "green",
  },
];

const ReportCard = () => {
  return (
    <Box height={"335px"}>
      <Box textAlign={"left"} marginLeft={"0.5rem"}>
        <Typography
          variant='h2'
          gutterBottom
          sx={{
            fontSize: "1.2rem",
            fontWeight: "500",
            color: "text.primary",
            textAlign: "left",
          }}
        >
          Report
        </Typography>
        <Typography
          variant='h2'
          sx={{
            fontSize: "0.8rem",
            fontWeight: "400",
            color: "text.secondary",
          }}
        >
          Yearly report overview
        </Typography>
      </Box>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        flexDirection={"column"}
        height={"200px"}
        marginTop={6}
      >
        {reportData.map((item, index) => (
          <Box height={"50px"} display={"flex"} justifyContent={"center"}>
            <StyledPaper
              sx={{
                boxShadow: "none",
                backgroundColor: "background.default",
                height: "60px",
                width: "90%",
                borderRadius: "5px",
              }}
            >
              {
                <Avatar
                  sx={{
                    width: 40, // The size of the Avatar (keeps the same)
                    height: 40, // The size of the Avatar (keeps the same)
                    marginRight: 2,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "background.paper",

                    img: {
                      width: "60%", // Control the size of the image inside the Avatar
                      height: "60%", // Control the size of the image inside the Avatar
                      objectFit: "contain", // Make sure the image fits well within the Avatar
                    },
                    borderRadius: "5px",
                  }}
                  src={item.icon}
                  variant='square'
                />
              }

              <Box>
                <Typography variant='body2' color='textSecondary'>
                  {item.label}
                </Typography>
                <Typography
                  variant='h6'
                  sx={{
                    fontWeight: "400",
                    fontSize: "16px",
                  }}
                >
                  {item.amount}
                </Typography>
              </Box>
              <Box ml='auto'>
                <Typography
                  variant='body2'
                  color={item.changeColor === "green" ? "success.main" : "warn"}
                >
                  {item.change}
                </Typography>
              </Box>
            </StyledPaper>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ReportCard;
