import React from "react";
import { Box, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { lightGreen } from "@mui/material/colors";
import purpleCard from "../../../img/eCommerce/purple-card.png";

export default function TransactionsCard() {
  return (
    <Box height={"150px"} marginLeft='0.5rem'>
      <Avatar
        sx={{ marginBottom: "0.5rem" }}
        variant='square'
        src={purpleCard}
      />
      <Box sx={{ textAlign: "left" }}>
        <Typography variant='subtitle1' gutterBottom>
          Transactions
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
          $14854
        </Typography>

        <Typography
          variant='subtitle2'
          gutterBottom
          sx={{ color: "success.main", position: "relative", top: "-5px" }}
        >
          <ArrowUpwardIcon sx={{ position: "relative", top: "5px" }} />
          17.53%
        </Typography>
      </Box>
    </Box>
  );
}
