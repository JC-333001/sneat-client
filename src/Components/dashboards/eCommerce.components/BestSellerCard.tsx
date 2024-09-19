import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import trophy from "../../../img/eCommerce/trophy.png";

const BestSellerCard = () => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "space-between",
        height: "100%",
        width: "100%",
        padding: "5px !important",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          justifyContent: "space-between",
          width: "60%",
          height: "100%",
        }}
      >
        {" "}
        <Typography
          variant='h5'
          component='div'
          fontSize={15}
          fontWeight={500}
          color='text.primary'
        >
          Congratulations Katie!
        </Typography>
        <Typography variant='subtitle1' color='text.secondary' fontSize={12}>
          Best seller of the month
        </Typography>
        <Typography
          variant='h3'
          component='div'
          color='#7352FF'
          fontWeight={400}
          fontSize={20}
          marginTop={1}
        >
          $48.9k
        </Typography>
        <Typography
          variant='body2'
          color='text.secondary'
          fontSize={12}
          marginBottom={1}
        >
          78% of target
        </Typography>
        <Button
          variant='contained'
          sx={{
            bgcolor: "#7352FF",
            "&:hover": { bgcolor: "#5E3FD9" },
            textTransform: "none",
            borderRadius: 2,
            fontSize: 10,
          }}
        >
          VIEW SALES
        </Button>
      </Box>

      <Box
        sx={{
          width: "40%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          top: "20px",
        }}
      >
        <img
          src={trophy}
          alt='trophy'
          style={{
            width: "80%",
            height: "auto",
            objectFit: "contain",
            maxHeight: "120px",
          }}
        />
      </Box>
    </Box>
  );
};

export default BestSellerCard;
