import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function Badge() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "100%",

        height: "150px",
        backgroundColor: "background.paper",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        variant='h1'
        gutterBottom
        sx={{ fontSize: "2rem", fontWeight: "500" }}
        color={"text.primary"}
      >
        Congratulations John! 🎉
      </Typography>
      <Typography variant='subtitle1' gutterBottom>
        You have done 72% more sales today. Check your new badge in your
        profile.
      </Typography>
      <Button
        variant='contained'
        color='primary'
        onClick={() => {
          navigate("/user-profile");
        }}
      >
        <Typography variant='button' display='block'>
          View Profile
        </Typography>
      </Button>
    </Box>
  );
}
