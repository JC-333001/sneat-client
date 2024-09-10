import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Paper, Box, Typography, TextField, Grid, Button } from "@mui/material";
import { User } from "../../routes/Profile";
import { updateUser } from "../../api/user.api";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import UserDeactivateForm from "./UserDeactivateForm.tsx";

const UserPasswordForm = ({ userInfo }: { userInfo: User }) => {
  const [user, setUser] = useState({ ...userInfo });
  const [confirmPass, setConfirmPass] = useState("");
  const [editState, setEditState] = useState(false);
  const navigate = useNavigate();

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

  const handleConfirmChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPass(e.target.value);
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setEditState(!editState);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (confirmPass == "") {
        setEditState(false);
        return;
      }
      if (user.password !== confirmPass) {
        alert("Password not match, please try again");
        setConfirmPass("");
        return;
      }
      await updateUser(user._id, user);
      setEditState(false); // Close edit mode
    } catch (error) {
      console.error("Error saving profile:", error);
    }
    navigate("/user-profile");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h4>Account</h4>
        <Grid container xs={12}>
          <Grid item xs={12} md={6}>
            <TextField
              required
              type='password'
              name='password'
              id='password'
              value={user.password}
              onChange={handleChange}
              disabled={!editState}
              label='Password:'
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              type='password'
              name='confirm-pass'
              id='confirm-pass'
              value={confirmPass}
              onChange={handleConfirmChange}
              disabled={!editState}
              label='Confirm Password:'
            />
          </Grid>
          <Grid item xs={12} sx={{ marginTop: "10px" }}>
            {editState ? (
              <div>
                <Button
                  sx={{
                    color: "white",
                    bgcolor: "primary.main",
                    "&:hover": {
                      bgcolor: "primary.main",
                    },
                  }}
                  type='submit'
                >
                  Save
                </Button>
                <Button
                  type='button'
                  onClick={() => {
                    setEditState(false);
                    setConfirmPass("");
                    setUser({ ...user, password: userInfo.password });
                  }}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <Button
                sx={{
                  color: "white",
                  bgcolor: "primary.main",
                  "&:hover": {
                    bgcolor: "primary.main",
                  },
                }}
                type='button'
                onClick={handleEdit}
              >
                Change Password
              </Button>
            )}
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default UserPasswordForm;
