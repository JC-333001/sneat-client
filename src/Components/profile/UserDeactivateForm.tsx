import React from "react";
import { Checkbox, Button, Typography, Box } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";
import { deleteUser } from "../../api/user.api";
import { User } from "../../routes/Profile";
import { useNavigate } from "react-router-dom";

export default function UserDeactivateForm({ userInfo }: { userInfo: User }) {
  const [confirm, setConfirm] = useState(false);
  const navigate = useNavigate();
  let handleClick = async () => {
    if (confirm) {
      try {
        await deleteUser(userInfo._id);
        sessionStorage.removeItem("User");
        navigate("/login");
      } catch (e) {
        console.log("Fail to delete this account", e);
      }
    } else {
      alert("Please confirm before deactivation");
    }
  };
  return (
    <div>
      <div>
        <h4 style={{ marginBottom: "5px" }}>Delete Account</h4>
        <FormGroup sx={{ marginLeft: "20px" }}>
          <Box alignItems={"start"} textAlign={"left"}>
            <Checkbox
              onClick={() => {
                setConfirm(!confirm);
                console.log("clicked!");
              }}
              id='checkbox'
            />
            <label htmlFor='checkbox'>I confirm my account deactivation</label>
          </Box>

          <Button
            sx={{
              color: "white",
              bgcolor: "#FF3E1D",
              width: "200px",
              "&:hover": {
                bgcolor: "#FF3E1D",
              },
            }}
            onClick={handleClick}
          >
            Deactivate account
          </Button>
        </FormGroup>
      </div>
    </div>
  );
}
