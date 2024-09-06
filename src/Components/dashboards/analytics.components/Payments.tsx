import React from "react";
import { Box, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { lightGreen } from "@mui/material/colors";
import PaidIcon from "@mui/icons-material/Paid";

export default function Payments() {
  return (
    <Box marginLeft='0.5rem'>
      <Avatar
        sx={{ bgcolor: "#FFE2DD", marginBottom: "0.5rem" }}
        variant='rounded'
        src='https://greakproject.vercel.app/images/cards/stats-vertical-paypal.png'
      />
      <Box sx={{ textAlign: "left" }}>
        <Typography variant='subtitle1' gutterBottom>
          Payments
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
          $2468
        </Typography>

        <Typography
          variant='subtitle2'
          gutterBottom
          sx={{ color: "warn", position: "relative", top: "-5px" }}
        >
          <ArrowDownwardIcon sx={{ position: "relative", top: "5px" }} />
          28.14%
        </Typography>
      </Box>
    </Box>
  );
}
