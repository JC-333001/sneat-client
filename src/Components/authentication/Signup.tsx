import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { createUser } from "../../api/user.api";
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Grid,
  Paper,
  IconButton,
} from "@mui/material";
import { Facebook, Twitter, GitHub, Google } from "@mui/icons-material";
import signupImage from "../../img/login/signup.png"; // Assuming you have a similar image for signup

interface User {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export default function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createUser(user);
      alert("Account has been created successfully, redirecting to login page");
      navigate("/login");
    } catch (error) {
      console.error("Error creating user account:", error);
      alert("An error occurred while creating the account");
    }
  };

  return (
    <Grid container component='main' sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={8}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          width='70%'
          height='70%'
          sx={{
            backgroundImage: `url(${signupImage})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
          }}
        ></Box>
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        md={4}
        component={Paper}
        elevation={6}
        square
        height='100%'
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            component='h1'
            variant='h5'
            color='primary'
            fontWeight='bold'
          >
            sneat
          </Typography>
          <Typography component='h2' variant='h5' sx={{ mt: 2 }}>
            Adventure starts here 🚀
          </Typography>
          <Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>
            Make your app management easy and fun!
          </Typography>

          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='name'
              label='Username'
              name='name'
              autoComplete='name'
              autoFocus
              value={user.name}
              onChange={handleChange}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email'
              name='email'
              autoComplete='email'
              value={user.email}
              onChange={handleChange}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='new-password'
              value={user.password}
              onChange={handleChange}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='phone'
              label='Phone'
              id='phone'
              autoComplete='tel'
              value={user.phone}
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value='agree' color='primary' />}
              label='I agree to privacy policy & terms'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              SIGN UP
            </Button>
            <Grid container justifyContent='center'>
              <Grid item>
                <Link component={RouterLink} to='/login' variant='body2'>
                  {"Already have an account? Sign in instead"}
                </Link>
              </Grid>
            </Grid>
          </Box>

          <Typography variant='body2' color='text.secondary' sx={{ mt: 2 }}>
            or
          </Typography>
          <Box sx={{ mt: 1 }}>
            <IconButton aria-label='facebook'>
              <Facebook />
            </IconButton>
            <IconButton aria-label='twitter'>
              <Twitter />
            </IconButton>
            <IconButton aria-label='github'>
              <GitHub />
            </IconButton>
            <IconButton aria-label='google'>
              <Google />
            </IconButton>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
