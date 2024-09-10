import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Paper, Box, Typography } from "@mui/material";
import { User } from "../../routes/Profile";
import { updateUser } from "../../api/user.api";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import UserPasswordForm from "./UserPasswordForm.tsx";
import TextField from "@mui/material/TextField";
import country from "country-list-js";
import Autocomplete from "@mui/material/Autocomplete";
import language_names from "../../utils/languages.ts";
import { Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

const UserProfileForm = ({ userInfo }: { userInfo: User }) => {
  const [user, setUser] = useState({ ...userInfo });
  const [editState, setEditState] = useState(false);
  const navigate = useNavigate();
  var country_names = country.names();

  // Update user state when userInfo prop changes
  useEffect(() => {
    setUser(userInfo);
  }, [userInfo]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setEditState(!editState);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateUser(user._id, user);
      setEditState(false); // Close edit mode
      window.location.reload();
    } catch (error) {
      console.error("Error saving profile:", error);
    }
    // navigate("/user-profile");
  };
  country_names = [...country_names, ""];
  let all_language_names = [...language_names, ""];
  const [countryInputValue, setCountryInputValue] = React.useState(
    user.country
  );
  const [languageInputValue, setLanguageInputValue] = React.useState(
    user.language
  );

  return (
    <form onSubmit={handleSubmit}>
      <h4>About</h4>
      <Grid
        container
        xs={12}
        md={6}
        sx={{
          width: "100% !important",
        }}
        alignItems={"start"}
        rowSpacing={2}
      >
        <Grid
          xs={12}
          md={6}
          sx={{
            alignContent: "start",
            alignItems: "start",
          }}
        >
          <TextField
            sx={{ width: "250px" }}
            required
            id='name'
            label='Full Name:'
            value={user.name}
            onChange={handleChange}
            disabled
          />
        </Grid>
        <Grid xs={12} md={6}>
          {" "}
          <TextField
            sx={{ width: "250px" }}
            required
            type='email'
            name='email'
            id='email'
            value={user.email}
            onChange={handleChange}
            disabled={!editState}
            label='Email:'
          />
        </Grid>
        <Grid xs={12} md={6}>
          <TextField
            sx={{ width: "250px" }}
            id='role'
            label='Role:'
            type='text'
            name='role'
            value={user.role}
            onChange={handleChange}
            disabled={!editState}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <TextField
            sx={{ width: "250px" }}
            required
            type='text'
            name='phone'
            id='phone'
            value={user.phone}
            onChange={handleChange}
            disabled={!editState}
            label='Phone:'
          />
        </Grid>
        <Grid xs={12} md={6}>
          <Box display={"flex"} justifyContent={"center"}>
            <Autocomplete
              disabled={!editState}
              options={country_names}
              value={user.country}
              sx={{ width: "250px" }}
              onChange={(event: any, newValue: string | null) => {
                if (newValue) {
                  setUser({ ...user, country: newValue });
                }
                console.log(user);
              }}
              onInputChange={(event, newInputValue) => {
                setCountryInputValue(newInputValue);
              }}
              renderInput={(params) => (
                <TextField {...params} label='Country' name='country' />
              )}
            />
          </Box>
        </Grid>
        <Grid xs={12} md={6}>
          <Box display={"flex"} justifyContent={"center"}>
            <Autocomplete
              disabled={!editState}
              options={all_language_names}
              value={user.language}
              sx={{ width: "250px" }}
              onChange={(event: any, newValue: string | null) => {
                if (newValue) {
                  setUser({ ...user, language: newValue });
                }
                console.log(user);
              }}
              onInputChange={(event, newInputValue) => {
                setLanguageInputValue(newInputValue);
              }}
              renderInput={(params) => (
                <TextField {...params} label='Language' name='language' />
              )}
            />
          </Box>
        </Grid>
        <Grid xs={12} md={12} sx={{ marginTop: "10px" }} alignItems={"start"}>
          {editState ? (
            <Button
              type='submit'
              sx={{
                color: "white",
                bgcolor: "primary.main",
                "&:hover": {
                  bgcolor: "primary.main",
                  width: "150px",
                },
              }}
            >
              Save
            </Button>
          ) : (
            <Button
              type='button'
              onClick={handleEdit}
              sx={{
                color: "white",
                bgcolor: "primary.main",
                "&:hover": {
                  bgcolor: "primary.main",
                },
                width: "100px",
              }}
            >
              Edit
            </Button>
          )}
        </Grid>
      </Grid>
    </form>
  );
};

export default UserProfileForm;
