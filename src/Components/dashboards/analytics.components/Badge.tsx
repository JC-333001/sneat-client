import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { User } from "../../../routes/Profile";
import { getUser } from "../../../api/user.api";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export default function Badge() {
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadUserData() {
      const token = sessionStorage.getItem("User");
      if (token) {
        const decoded = jwtDecode<User>(token);
        let userInfo = user;
        try {
          userInfo = await getUser(decoded._id);
        } catch (e) {
          console.error("Fail to fetch user's info", e);
        }

        if (userInfo && userInfo.joinDate) {
          userInfo.joinDate = new Date(userInfo.joinDate);
        }
        setUser(userInfo);
      } else {
        navigate("/login");
      }
    }
    loadUserData();
  }, []);

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
        {`Congratulations ${user?.name}! 🎉`}
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
