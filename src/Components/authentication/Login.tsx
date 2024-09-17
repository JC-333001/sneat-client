import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { verifyUser } from "../../api/user.api";
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
import loginImage from "../../img/login/login.png";

interface User {
  email: string;
  password: string;
}

export default function Login() {
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

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
      let response = await verifyUser(user);
      sessionStorage.setItem("User", response);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred during login");
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
            backgroundImage: `url(${loginImage})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
          }}
        ></Box>
      </Grid>
      <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
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
            Welcome to Sneat! 👋
          </Typography>
          <Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>
            Please sign-in to your account and start the adventure
          </Typography>

          <Box
            sx={{ mt: 2, p: 2, bgcolor: "background.paper", borderRadius: 1 }}
          >
            <Typography variant='body2' color='text.secondary'>
              Admin: admin@sneat.com / Pass: admin
            </Typography>
            {/* <Typography variant='body2' color='text.secondary'>
              Client: client@sneat.com / Pass: client
            </Typography> */}
          </Box>

          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email'
              name='email'
              autoComplete='email'
              autoFocus
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
              autoComplete='current-password'
              value={user.password}
              onChange={handleChange}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 1,
              }}
            >
              <FormControlLabel
                control={<Checkbox value='remember' color='primary' />}
                label='Remember me'
              />
              <Link href='#' variant='body2'>
                Forgot password?
              </Link>
            </Box>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              SIGN IN
            </Button>
            <Grid container justifyContent='center'>
              <Grid item>
                <Link component={RouterLink} to='/signup' variant='body2'>
                  {"New on our platform? Create an account"}
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
