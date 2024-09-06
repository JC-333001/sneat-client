import React, {
  useEffect,
  useState,
  useCallback,
  FormEvent,
  ChangeEvent,
} from "react";
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
import { updateUser } from "../api/user.api";
import "./profile.css";
import { ObjectId } from "mongodb";
import AdbIcon from "@mui/icons-material/Adb";
import PersonPinCircleIcon from "@mui/icons-material/PersonPinCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import UserProfileForm from "../Components/profile/UserProfileForm.tsx";
import { getUser } from "../api/user.api";
import UserPasswordForm from "../Components/profile/UserPasswordForm.tsx";
import UserDeactivateForm from "../Components/profile/UserDeactivateForm.tsx";

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
  });

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
    // minWidth: "150px",
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
                borderRadius: "5px",
                border: "5px white solid",
              }}
              image={userPhoto}
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
                      {user.role}
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
                      {user && user.country ? user.country : ""}
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

              {/* <Button
                  onClick={hadleEdit}
                  sx={{
                    color: "white",
                    bgcolor: "primary.main",
                    "&:hover": {
                      bgcolor: "primary.main",
                    },
                    marginRight: "5px",
                    height: "3rem",
                    minWidth: "8rem",
                  }}
                >
                  {editState ? "Save" : "Edit Profile"}
                </Button> */}
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

// const UserProfileForm = React.memo(({ userInfo }: { userInfo: User }) => {
//   let [user, setUser] = useState({ ...userInfo });
//   const [editState, setEditState] = useState(false);
//   // Update user state when userInfo prop changes
//   useEffect(() => {
//     setUser(userInfo);
//   }, [userInfo]);
//   const handleChange = useCallback(
//     (e: ChangeEvent<HTMLInputElement>) => {
//       const { name, value } = e.target;
//       setUser((prevUser) => ({
//         ...prevUser,
//         [name]: value,
//       }));
//     },
//     [setUser]
//   );

//   const handleEdit = () => {
//     setEditState(!editState);
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       await updateUser(user._id, user);
//       handleEdit(); // Close edit mode
//     } catch (error) {
//       console.error("Error saving profile:", error);
//     }
//   };

//   return (
//     <Paper>
//       <Box padding={"10px 15px"}>
//         <form onSubmit={handleSubmit}>
//           <Typography variant='h6'>About</Typography>
//           {editState ? (
//             <button type='submit'>Save</button>
//           ) : (
//             <button type='button' onClick={handleEdit}>
//               Edit
//             </button>
//           )}
//           <div className='form-ele'>
//             <label htmlFor='name'>Full Name:</label>
//             <input
//               type='text'
//               name='name'
//               id='name'
//               value={user.name}
//               onChange={handleChange}
//               disabled={!editState}
//             />
//           </div>
//           <div className='form-ele'>
//             <label htmlFor='role'>Role:</label>
//             <input
//               type='text'
//               name='role'
//               id='role'
//               value={user.role}
//               onChange={handleChange}
//               disabled={!editState}
//             />
//           </div>
//           <div className='form-ele'>
//             <label htmlFor='email'>Email:</label>
//             <input
//               type='email'
//               name='email'
//               id='email'
//               value={user.email}
//               onChange={handleChange}
//               disabled={!editState}
//             />
//           </div>
//         </form>
//       </Box>
//     </Paper>
//   );
// });
