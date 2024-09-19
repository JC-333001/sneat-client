import * as React from "react";
import { styled, useTheme, alpha, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import CircleIcon from "@mui/icons-material/Circle";
import HomeIcon from "@mui/icons-material/Home";
import EmailIcon from "@mui/icons-material/Email";
import ChatIcon from "@mui/icons-material/Chat";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { createTheme } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import {
  DASHBOARD,
  ANALYTICS,
  EMAIL,
  CRM,
  ECOMMERCE,
  CHAT,
  CALENDAR,
} from "../utils/const.name.ts";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Collapse from "@mui/material/Collapse";
import { ListSubheader } from "@mui/material";
import { useColorContext } from "../context/ColorModeContext.tsx";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const drawerWidth = 240;
const menuId = "primary-search-account-menu";
const grey = "#85909D";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function NavLeft({ children }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [dashOpen, setDashOpen] = React.useState(true);
  const [currentIndex, setCurrentIndex] = React.useState(DASHBOARD);
  const [currentApp, setCurrentApp] = React.useState(ANALYTICS);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleDashClick = (name?): void => {
    if (name) {
      setCurrentIndex(DASHBOARD);
      setCurrentApp(name);
    } else {
      setDashOpen(!dashOpen);
    }
    console.log("handledashclick currentPP= ", name, currentApp);
  };

  const handleAppClick = (appName): void => {
    setCurrentIndex(appName);
    setCurrentApp(appName);
    setDashOpen(false);
    // console.log("handleemailclick currentindex= ", currentIndex);
  };

  const handleChatClick = (): void => {
    setCurrentIndex(CHAT);
    setCurrentApp(CHAT);
    setDashOpen(false);
    // console.log("handleemailclick currentindex= ", currentIndex);
  };

  const regTheme = createTheme({
    components: {
      // Name of the component
      MuiTypography: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            fontWeight: "400",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: "background.default",
          },
        },
      },
    },
  });
  const boldTheme = createTheme({
    components: {
      // Name of the component
      MuiTypography: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            fontWeight: "500",
          },
        },
      },
    },
  });

  const { mode, toggleColorMode } = useColorContext();
  // console.log("in navleft", mode, toggleColorMode);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("User");
    navigate("/login");
  };

  const handleProfile = () => {
    navigate("/user-profile");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position='fixed'
        open={open}
        sx={{
          boxShadow: "none",
          border: "none",
          width: "100%",
          bgcolor: "background.default",
        }}
      >
        <Box sx={{ bgcolor: "background.paper" }}>
          <Toolbar sx={{ paddingLeft: "0 !important" }}>
            <IconButton
              aria-label='open drawer'
              onClick={handleDrawerOpen}
              edge='start'
              sx={{
                mr: 2,
                color: "text.primary",
                ...(open && { display: "none" }),
                position: "relative",
                left: "2rem",
              }}
            >
              <MenuIcon />
            </IconButton>
            <Search sx={{ bgcolor: "background.paper" }}>
              <SearchIconWrapper>
                <SearchIcon sx={{ color: "text.primary" }} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder='Search…'
                sx={{ color: "text.secondary", fontWeight: "400" }}
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: "flex" }}>
              <IconButton
                size='large'
                edge='end'
                aria-label='account of current user'
                aria-controls={menuId}
                aria-haspopup='true'
                sx={{ color: "text.primary" }}
                onClick={toggleColorMode}
              >
                {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
              <IconButton
                size='large'
                edge='end'
                aria-label='account of current user'
                aria-controls={"basic-menu"}
                aria-haspopup='true'
                sx={{ color: "text.primary" }}
                onClick={handleMenuClick}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id='basic-menu'
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleMenuClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Box>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant='temporary'
        anchor='left'
        open={open}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        <DrawerHeader
          sx={{
            display: "flex",
            justifyContent: "space-between",
            paddingLeft: "30px",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <svg
              width='22'
              height='32'
              viewBox='0 0 55 81'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill='#696CFF'
                d='M30.1984 0.0144043C24.8945 0.425781 25.2534 6.16968 26.6435 7.65326C22.693 10.3649 13.1875 16.8867 6.76944 21.2803C1.21531 25.0824 -0.842975 34.6064 1.11159 40.8262C3.00952 46.8658 12.4904 51.3615 17.5337 52.7256C17.5337 52.7256 11.7188 56.0269 6.60358 60.0482C1.48831 64.0695 -0.622615 69.3436 3.06836 75.262C6.75933 81.1805 12.725 80.761 17.5257 78.6229C22.3264 76.4848 32.1683 69.1692 37.9402 65.1633C42.7282 61.5411 43.9669 53.6444 41.7631 46.9643C39.9758 41.5468 30.0969 36.4284 25.1792 34.6064C27.1946 33.1595 32.4935 29.4242 37.129 26.0909C38.7184 30.5636 43.9998 30.212 45.6103 27.8209C47.6216 23.4326 51.8339 13.4663 53.9579 8.55175C54.8862 4.81044 52.5639 2.78457 50.2227 2.35938C46.8672 1.75 38.3222 0.960115 30.1984 0.0144043Z'
              ></path>
              <path
                fillOpacity='0.2'
                fill='#FFF'
                d='M26.6523 7.65625C24.9492 5.625 25.3239 0.255308 30.2922 0.0105286C33.0074 0.326611 35.7804 0.62685 38.3907 0.909477C43.5904 1.47246 48.1446 1.96556 50.311 2.3748C52.7331 2.83234 54.886 5.06072 53.9543 8.61103C53.2063 10.3418 52.2075 12.6646 51.1482 15.1282C49.1995 19.6601 47.0459 24.6685 45.8717 27.3445C44.7224 29.964 39.111 31.0585 37.1137 26.0951C32.4782 29.4283 27.2884 33.1556 25.273 34.6026C24.931 34.4553 24.3074 34.2381 23.5124 33.9613C20.8691 33.0407 16.331 31.4602 13.9477 29.5966C9.61363 25.5918 11.6259 19.4662 13.1737 16.904C17.8273 13.7183 20.7417 11.7161 23.4984 9.82236C24.5437 9.10427 25.5662 8.40178 26.6523 7.65625Z'
              ></path>
              <path
                fillOpacity='0.2'
                fill='#FFF'
                d='M17.543 52.7266C21.2241 53.9875 28.5535 57.0509 30.091 59.101C32.0129 61.6635 33.1576 64.34 29.2527 71.2039C28.5954 71.6481 27.9821 72.0633 27.4069 72.4528C22.1953 75.9817 20.1085 77.3946 16.6243 79.0531C13.5855 80.2464 6.61575 81.7103 2.66559 74.5653C-1.11764 67.7222 3.23818 62.7113 6.5963 60.065L12.1695 56.0339L14.8359 54.3477L17.543 52.7266Z'
              ></path>
            </svg>
            <Typography
              variant='h5'
              sx={{
                marginLeft: "0.5rem",
                color: "text.primary",
                fontWeight: "700",
                textTransform: "lowercase",
                letterSpacing: "-0.45px",
              }}
            >
              Sneat
            </Typography>
          </Box>

          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <List
            sx={{
              width: "90%",
              maxWidth: 360,
              bgcolor: "background.paper",
            }}
            component='nav'
            aria-labelledby='nested-list-subheader'
          >
            <ListItemButton
              onClick={() => {
                handleDashClick();
              }}
              sx={{
                bgcolor:
                  currentIndex == DASHBOARD
                    ? "primary.light"
                    : "background.paper",
                color:
                  currentIndex == DASHBOARD ? "primary.main" : "text.secondary",
                "&:hover": {
                  bgcolor: currentIndex == DASHBOARD ? "primary.light" : "",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color:
                    currentIndex == DASHBOARD
                      ? "primary.main"
                      : "text.secondary",
                }}
              >
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary='Dashboard' />
              {dashOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={dashOpen} timeout='auto' unmountOnExit>
              <List component='div' disablePadding sx={{ marginTop: "0.3rem" }}>
                {[ANALYTICS, CRM, ECOMMERCE].map((item, index) => {
                  return (
                    <Link
                      to={`dashboard/${item.toLowerCase()}`}
                      style={{ textDecoration: "none" }}
                      key={item}
                    >
                      <ListItemButton
                        sx={{
                          pl: 4,
                          height: "2rem",
                          color:
                            currentApp == item
                              ? "text.primary"
                              : "text.secondary",
                        }}
                        onClick={() => {
                          handleDashClick(item);
                        }}
                        key={index}
                      >
                        <ListItemIcon>
                          <CircleIcon
                            sx={{
                              fontSize:
                                currentApp == item ? "0.6rem" : "0.5rem",
                              color:
                                currentApp == item
                                  ? "primary.dark"
                                  : "text.secondary",
                            }}
                          />
                        </ListItemIcon>
                        <ThemeProvider
                          theme={currentApp == item ? boldTheme : regTheme}
                        >
                          <ListItemText primary={item} />
                        </ThemeProvider>
                      </ListItemButton>
                    </Link>
                  );
                })}
              </List>
            </Collapse>
            <Divider textAlign='left' sx={{ color: grey, fontSize: "12px" }}>
              APPs
            </Divider>

            {[
              { appName: CHAT, icon: <ChatIcon /> },
              {
                appName: CALENDAR,
                icon: <CalendarMonthIcon />,
              },
            ].map((item, index) => {
              return (
                <Link
                  to={item.appName.toLowerCase()}
                  style={{ textDecoration: "none" }}
                  key={item.appName}
                >
                  <ListItemButton
                    key={index}
                    onClick={() => {
                      handleAppClick(item.appName);
                    }}
                    sx={{
                      bgcolor:
                        currentIndex == item.appName
                          ? "primary.light"
                          : "background.paper",
                      color:
                        currentIndex == item.appName
                          ? "primary.main"
                          : "text.secondary",
                      "&:hover": {
                        bgcolor:
                          currentIndex == item.appName ? "primary.light" : "",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color:
                          currentIndex == item.appName
                            ? "primary.main"
                            : "text.secondary",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.appName} />
                  </ListItemButton>
                </Link>
              );
            })}
          </List>
        </Box>
      </Drawer>
      {/* <Main open={open}>
        <DrawerHeader />
        {children}
      </Main> */}
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          width: "100%",
          marginTop: "64px", // Adjust this value based on your AppBar height
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
