import React from "react";
import { Box, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { lightGreen } from "@mui/material/colors";

export default function Sales() {
  return (
    <Box height={"150px"} marginLeft='0.5rem'>
      <Avatar
        sx={{ bgcolor: "#E0F6FC", marginBottom: "0.5rem" }}
        variant='square'
        src='https://greakproject.vercel.app/images/cards/stats-vertical-wallet.png'
      />
      <Box sx={{ textAlign: "left" }}>
        <Typography variant='subtitle1' gutterBottom>
          Sales
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
          $4679
        </Typography>

        <Typography
          variant='subtitle2'
          gutterBottom
          sx={{ color: "success.main", position: "relative", top: "-5px" }}
        >
          <ArrowUpwardIcon sx={{ position: "relative", top: "5px" }} />
          28.14%
        </Typography>
      </Box>
    </Box>
  );
}
