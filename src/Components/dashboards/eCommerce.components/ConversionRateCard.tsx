import React from "react";
import {
  Typography,
  Grid,
  Box,
  IconButton,
  useTheme,
  Card,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const ConversionRateCard: React.FC = () => {
  const theme = useTheme();

  return (
    <Box>
      <Box textAlign={"left"} marginLeft={"0.5rem"}>
        <Typography variant='h6' color='text.primary'>
          Conversion Rate
        </Typography>

        <Typography
          variant='h2'
          sx={{
            fontSize: "0.8rem",
            fontWeight: "400",
            color: "text.secondary",
            marginRight: "0.5rem",
          }}
        >
          Compared To Last Month
        </Typography>
      </Box>

      <Box display='flex' alignItems='start' mt={3} mb={3} ml={"0.5rem"}>
        <Typography
          variant='h3'
          fontWeight={450}
          color='text.primary'
          fontSize={30}
        >
          8.72%
        </Typography>
        <Box display='flex' alignItems='center' ml={2}>
          <ArrowUpwardIcon sx={{ color: "success.main" }} />
          <Typography variant='body2' color='success.main' fontWeight={400}>
            +4.8%
          </Typography>
        </Box>
      </Box>

      <Grid
        container
        spacing={2}
        padding={0.5}
        paddingTop={0}
        paddingBottom={0}
      >
        {/* Impressions */}
        <Grid item xs={12} display='flex' justifyContent='space-between'>
          <Box>
            <Typography
              variant='body1'
              fontWeight={500}
              color={theme.palette.text.primary}
            >
              Impressions
            </Typography>{" "}
            <Typography
              variant='body2'
              color={theme.palette.text.secondary}
              sx={{ fontSize: "0.8rem" }}
              textAlign={"left"}
            >
              12.4k Visits
            </Typography>
          </Box>

          <Box display='flex' alignItems='center'>
            <Box display='flex' alignItems='center' ml={1}>
              <ArrowUpwardIcon sx={{ color: "success.main", fontSize: 16 }} />
              <Typography variant='body2' color='success.main'>
                12.8%
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Added to Cart */}
        <Grid item xs={12} display='flex' justifyContent='space-between'>
          <Box>
            <Typography
              variant='body1'
              fontWeight={500}
              color={theme.palette.text.primary}
            >
              Added To Cart
            </Typography>{" "}
            <Typography
              variant='body2'
              color={theme.palette.text.secondary}
              sx={{ fontSize: "0.8rem" }}
              textAlign={"left"}
            >
              32 Product in cart
            </Typography>
          </Box>
          <Box display='flex' alignItems='center'>
            <Box display='flex' alignItems='center' ml={1}>
              <ArrowDownwardIcon sx={{ color: "warn", fontSize: 16 }} />
              <Typography variant='body2' color='warn'>
                -8.3%
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Checkout */}
        <Grid item xs={12} display='flex' justifyContent='space-between'>
          <Box>
            <Typography
              variant='body1'
              fontWeight={500}
              color={theme.palette.text.primary}
              textAlign={"left"}
            >
              Checkout
            </Typography>
            <Typography
              variant='body2'
              color={theme.palette.text.secondary}
              sx={{ fontSize: "0.8rem" }}
              textAlign={"left"}
            >
              21 Product checkout
            </Typography>
          </Box>
          <Box display='flex' alignItems='center'>
            <Box display='flex' alignItems='center' ml={1}>
              <ArrowUpwardIcon sx={{ color: "success.main", fontSize: 16 }} />
              <Typography variant='body2' color='success.main'>
                9.12%
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Purchased */}
        <Grid item xs={12} display='flex' justifyContent='space-between'>
          <Box>
            <Typography
              variant='body1'
              fontWeight={500}
              color={theme.palette.text.primary}
              textAlign={"left"}
            >
              Purchased
            </Typography>
            <Typography
              variant='body2'
              color={theme.palette.text.secondary}
              sx={{ fontSize: "0.8rem" }}
              textAlign={"left"}
            >
              12 Orders
            </Typography>
          </Box>
          <Box display='flex' alignItems='center'>
            <Box display='flex' alignItems='center' ml={1}>
              <ArrowUpwardIcon sx={{ color: "success.main", fontSize: 16 }} />
              <Typography variant='body2' color='success.main'>
                2.24%
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ConversionRateCard;
