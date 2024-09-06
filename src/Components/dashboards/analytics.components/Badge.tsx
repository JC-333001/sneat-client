import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

export default function Badge() {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 600,
        height: "150px",
        backgroundColor: "background.paper",
      }}
    >
      <Typography
        variant='h1'
        gutterBottom
        sx={{ fontSize: "2rem", fontWeight: "500" }}
      >
        Congratulations John! 🎉
      </Typography>
      <Typography variant='subtitle1' gutterBottom>
        You have done 72% more sales today. Check your new badge in your
        profile.
      </Typography>
      <Button>
        <Typography variant='button' display='block' gutterBottom>
          button text
        </Typography>
      </Button>
    </Box>
  );
}
