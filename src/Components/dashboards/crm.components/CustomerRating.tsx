import React from "react";
import { Box, Typography } from "@mui/material";

export default function CustomerRating() {
  return (
    <Box>
      <Typography
        variant='h2'
        gutterBottom
        sx={{
          fontSize: "1.2rem",
          fontWeight: "500",
          color: "text.primary",
          textAlign: "left",
          position: "relative",
          left: "20px",
        }}
      >
        Customer Ratings
      </Typography>
    </Box>
  );
}
