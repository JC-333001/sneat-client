import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import banner from "../img/profile/profile-banner.png";
import userPhoto from "../img/profile/user-photo.png";
import "./profile.css";
import AdbIcon from "@mui/icons-material/Adb";
import PersonPinCircleIcon from "@mui/icons-material/PersonPinCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import UserProfileForm from "../Components/profile/UserProfileForm.tsx";
import { getUser } from "../api/user.api";
import UserPasswordForm from "../Components/profile/UserPasswordForm.tsx";
import UserDeactivateForm from "../Components/profile/UserDeactivateForm.tsx";
import UserImageUpload from "../Components/profile/UserImageUpload.tsx";

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  joinDate: Date;
  country: string;
  role: string;
  language: string;
  imageUrl: string | null;
}

export default function Profile() {
  const [user, setUser] = useState<User>({
    _id: "",
    name: "",
    email: "",
    password: "",
    phone: "",
    joinDate: new Date(),
    country: "",
    role: "",
    language: "",
    imageUrl: null,
  });

  const [preview, setPreview] = useState<string | null>(null);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "background.paper",
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

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

        if (userInfo.joinDate) {
          userInfo.joinDate = new Date(userInfo.joinDate);
        }
        setUser(userInfo);
      }
    }
    loadUserData();
  }, []);

  const SubBox = styled(Box)(({ theme }) => ({
    color: theme.palette.text.secondary,
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    marginRight: "5px",
  }));

  return (
    <Grid container xs={12} rowSpacing={2} width={"100%"}>
      <Grid xs={12}>
        <Card sx={{ width: "100%" }}>
          <CardMedia
            component='img'
            height='150'
            image={banner}
            alt='profile banner'
          />
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "center",
              position: "relative",
              alignItems: "end",
              top: "-20px",
              padding: "0 20px 0 20px !important",
              margin: "0",
              flexWrap: "wrap",
            }}
          >
            <CardMedia
              component='img'
              sx={{
                width: "150px",
                height: "150px",
                borderRadius: "5px",
                border: "5px white solid",
                objectFit: "cover",
              }}
              image={
                preview ? preview : user.imageUrl ? user.imageUrl : userPhoto
              }
              alt='user photo'
            />
            <div className='info-box'>
              <div className='info-detail'>
                <Typography gutterBottom variant='h5' component='div'>
                  {user ? user.name : "Null"}
                </Typography>
                <div className='user-info-box'>
                  <SubBox>
                    <AdbIcon />
                    <Typography
                      variant='body2'
                      marginLeft={"5px"}
                      fontWeight={500}
                      fontSize={15}
                    >
                      {user.role ? user.role : "Alien"}
                    </Typography>
                  </SubBox>
                  <SubBox>
                    <PersonPinCircleIcon />
                    <Typography
                      variant='body2'
                      marginLeft={"5px"}
                      fontWeight={500}
                      fontSize={15}
                    >
                      {user && user.country ? user.country : "Mars"}
                    </Typography>
                  </SubBox>
                  <SubBox>
                    <CalendarMonthIcon />
                    <Typography
                      variant='body2'
                      marginLeft={"5px"}
                      fontWeight={500}
                      fontSize={15}
                    >
                      {`Joined on ${
                        user
                          ? user.joinDate.toLocaleDateString("en-US")
                          : new Date().toLocaleDateString("en-US")
                      }`}
                    </Typography>
                  </SubBox>
                </div>
              </div>
              <UserImageUpload userInfo={user} setPreview={setPreview} />
            </div>
          </CardContent>
        </Card>
      </Grid>

      <Grid container xs={12} spacing={2}>
        <Grid xs={12} md={6}>
          <Item>
            {" "}
            <UserProfileForm userInfo={user} />
          </Item>
        </Grid>
        <Grid container xs={12} md={6}>
          <Grid xs={12}>
            <Item>
              <UserPasswordForm userInfo={user} />
            </Item>
          </Grid>
          <Grid xs={12}>
            <Item>
              <UserDeactivateForm userInfo={user} />
            </Item>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
