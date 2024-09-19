import React, { useEffect, useState } from "react";
import GrowthGaugeChart from "../../echarts.components/GrowthGaugeChart.tsx";
import { Box, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import Button from "@mui/material/Button";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export interface GrowthData {
  _id: string;
  value: number;
  year: string;
}

export default function Growth() {
  const [open, setOpen] = useState(false);
  const [year, setYear] = useState("2024");
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const [data, setData] = useState<GrowthData[]>([]);
  let token = sessionStorage.getItem("User");
  const navigate = useNavigate();
  useEffect(() => {
    async function grabData() {
      try {
        const response = await axios.get(
          "https://sneat-backend-e54d9967a82c.herokuapp.com/growth"
        );
        if (response.status === 200) {
          setData(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response.status == 403) {
          navigate("/login");
        }
      }
    }

    // Set token in every axios request header
    try {
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
      grabData();
    } catch (error) {
      console.error("Error setting token or fetching data:", error);
    }
  }, [token]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setYear(year == "2023" ? "2024" : "2023");
    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  let displayData: number =
    data.length == 0
      ? 0
      : data.filter((item) => {
          return item.year === year;
        })[0].value;

  return (
    <Box
      height={"320px"}
      width={"100%"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
    >
      <div>
        <Button
          ref={anchorRef}
          id='composition-button'
          aria-controls={open ? "composition-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup='true'
          onClick={handleToggle}
          variant='outlined'
          sx={{ marginBottom: "5px" }}
        >
          {year}
          {!open ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement='bottom-start'
          transition
          disablePortal
          sx={{ zIndex: "10" }}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-start" ? "left top" : "left bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id='composition-menu'
                    aria-labelledby='composition-button'
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={handleClose}>
                      {year == "2023" ? "2024" : "2023"}
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
      {/* <Button variant='outlined' onClick={handleClick}>
        2024 {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </Button> */}
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        width={"100%"}
      >
        <GrowthGaugeChart growthValue={displayData} />
        <Typography variant='subtitle1' position={"relative"} top={"-30px"}>
          62% Company Growth
        </Typography>
      </Box>
      <Box display={"flex"} justifyContent={"space-around"} width={"100%"}>
        <Box display={"flex"}>
          <Avatar sx={{ bgcolor: "primary.light" }} variant='rounded'>
            <AttachMoneyIcon sx={{ color: "primary.main" }} />
          </Avatar>
          <Box marginLeft={"5px"} position={"relative"} top={"-2px"}>
            <Typography variant='subtitle2'>{Number(year) - 1}</Typography>
            <Typography
              variant='subtitle2'
              sx={{
                fontSize: "1rem",
                fontWeight: "400",
                color: "text.primary",
              }}
            >
              32.5k
            </Typography>
          </Box>
        </Box>
        <Box display={"flex"}>
          <Avatar sx={{ bgcolor: "#E0F6FC" }} variant='rounded'>
            <AccountBalanceWalletIcon sx={{ color: "#03C3EB" }} />
          </Avatar>
          <Box marginLeft={"5px"} position={"relative"} top={"-2px"}>
            <Typography variant='subtitle2'>{year}</Typography>
            <Typography
              variant='subtitle2'
              sx={{
                fontSize: "1rem",
                fontWeight: "400",
                color: "text.primary",
              }}
            >
              41.2k
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
