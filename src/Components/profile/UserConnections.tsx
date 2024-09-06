import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { User } from "../../routes/Profile";
import { getAllUser } from "../../api/user.api";
import { Paper } from "@mui/material";

export default function UserConnections({ userInfo }: { userInfo: User }) {
  const [allUser, setAllUser] = useState<User[]>([]);

  useEffect(() => {
    async function loadAllUserData() {
      try {
        let allUserInfo = await getAllUser();
        setAllUser(allUserInfo);
        console.log(allUserInfo);
      } catch (e) {
        console.error("Fail to fetch user's info", e);
      }
    }
    loadAllUserData();
  }, []);
  return (
    <div>
      <h4>Connections</h4>
      <List>
        {allUser.map((info, index) => {
          if (info._id !== userInfo._id && index <= 6) {
            return (
              <ListItem
                secondaryAction={
                  <IconButton edge='end' aria-label='delete'>
                    <PersonAddIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar src={require("../../img/avatar/1.png")} />
                </ListItemAvatar>
                <ListItemText primary={info.name} secondary={info.role} />
                <ListItemText primary={info.email} />
              </ListItem>
            );
          }
        })}
      </List>
    </div>
  );
}
