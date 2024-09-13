import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { io, Socket } from "socket.io-client";
import { User } from "../../routes/Profile";
import {
  Avatar,
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Box,
  InputBase,
  IconButton,
  Drawer,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/system";
import { getUser, getAllUser } from "../../api/user.api";

interface Message {
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
}

const SOCKET_SERVER_URL = process.env.REACT_APP_BACKEND_URL;
const CONNECTION_TIMEOUT = 6000; // 2 minutes in milliseconds

const StyledPaper = styled(Paper)(({ theme }) => ({
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  borderRadius: 0,
}));

const ChatBubble = styled("div")<{ isCurrentUser: boolean }>(
  ({ theme, isCurrentUser }) => ({
    backgroundColor: isCurrentUser
      ? theme.palette.primary.main
      : theme.palette.grey[100],
    color: isCurrentUser
      ? theme.palette.primary.contrastText
      : theme.palette.text.primary,
    borderRadius: 20,
    padding: "10px 15px",
    maxWidth: "70%",
    alignSelf: isCurrentUser ? "flex-end" : "flex-start",
    margin: "5px 0",
  })
);

const RealChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [user, setUser] = useState<User>({} as User);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [chatUsers, setChatUsers] = useState<User[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeChat = async () => {
      const token = sessionStorage.getItem("User");
      if (!token) {
        navigate("/login");
        return;
      }
      const decoded = jwtDecode<User>(token);
      const user = await getUser(decoded._id);
      setUser(user);
      fetchChatUsers();

      // Initialize socket connection with timeout
      if (SOCKET_SERVER_URL) {
        const newSocket = io(SOCKET_SERVER_URL);
        setSocket(newSocket);

        const timeoutId = setTimeout(() => {
          if (newSocket.connected === false) {
            console.error("Socket connection timed out");
            newSocket.disconnect();
            setSocket(null);
          }
        }, CONNECTION_TIMEOUT);

        newSocket.on("connect", () => {
          clearTimeout(timeoutId);
        });

        return () => {
          clearTimeout(timeoutId);
          newSocket.disconnect();
        };
      } else {
        console.error("Socket server URL is not defined");
      }
    };
    initializeChat();
  }, [navigate]);

  useEffect(() => {
    if (!socket) return;

    // Listen for the chat history from the server
    socket.on("user_chat_history", (history: Message[]) => {
      setMessages(history);
    });

    // Listen for new messages
    socket.on("new message", (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Request chat history when a user is selected
    if (selectedUser) {
      console.log(selectedUser._id);
      socket.emit("get chat history", {
        userId: user._id,
        selectedUserId: selectedUser._id,
      });
    }

    // Clean up listeners
    return () => {
      socket.off("user_chat_history");
      socket.off("new message");
    };
  }, [socket, selectedUser, user._id]);

  const fetchChatUsers = async () => {
    const users = await getAllUser();
    setChatUsers(users.filter((singleUser) => singleUser._id !== user._id));
  };

  const sendMessage = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (selectedUser && socket && inputMessage.trim()) {
        const newMessage = {
          senderId: user._id,
          receiverId: selectedUser._id,
          content: inputMessage,
          timestamp: new Date(),
        };
        socket.emit("send message", newMessage);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setInputMessage("");
      }
    },
    [inputMessage, selectedUser, socket, user._id]
  );

  return (
    <Grid
      container
      sx={{ height: "80vh", borderRadius: "10px", overflow: "hidden" }}
    >
      {/* Sidebar */}
      <Grid
        item
        xs={3}
        sx={{ height: "100%", borderRight: "1px solid #B2B9C1" }}
      >
        <StyledPaper elevation={0} sx={{ height: "100%" }}>
          {/* User profile */}
          <ListItem
            sx={{
              height: "70px",
              display: "flex",
              justifyContent: "center !important",
              alignItems: "center !important",
            }}
          >
            <ListItemAvatar>
              <Avatar src={user.imageUrl} />
            </ListItemAvatar>
            <form action='' style={{ display: "flex", alignItems: "center" }}>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder='Search users'
                inputProps={{ "aria-label": "search users" }}
              />
              <IconButton type='submit' sx={{ p: "10px" }} aria-label='search'>
                <SearchIcon />
              </IconButton>
            </form>
          </ListItem>
          <Divider />

          {/* Chats section */}
          <Box
            sx={{
              height: "50vh",
            }}
          >
            <Typography variant='h6' sx={{ mt: 2, mb: 1, px: 2 }}>
              Chats
            </Typography>
            <List>
              {chatUsers.map((user) => (
                <ListItem
                  button
                  key={user._id}
                  onClick={() => setSelectedUser(user)}
                  selected={selectedUser?._id === user._id}
                >
                  <ListItemAvatar>
                    <Avatar src={user.imageUrl} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={user.name}
                    secondary={"last message preview"}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </StyledPaper>
      </Grid>

      {/* Chat area */}
      <Grid item xs={9} sx={{ height: "100%" }}>
        <StyledPaper elevation={0} sx={{ height: "100%" }}>
          {selectedUser ? (
            <Box>
              {/* Chat header */}

              <Box>
                <ListItem sx={{ height: "70px" }}>
                  <ListItemAvatar>
                    <Avatar src={selectedUser.imageUrl} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={selectedUser.name}
                    secondary='Frontend Developer'
                  />
                </ListItem>
                <Divider />
              </Box>

              {/* Messages */}
              <div style={{ flexGrow: 1, overflowY: "auto", padding: "16px" }}>
                {messages.map((message, index) => (
                  <ChatBubble
                    key={index}
                    isCurrentUser={message.senderId === user._id}
                  >
                    {message.content}
                  </ChatBubble>
                ))}
              </div>
              {/* Message input */}

              <form onSubmit={sendMessage}>
                <TextField
                  fullWidth
                  variant='outlined'
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder='Type your message here...'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <AttachFileIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  endIcon={<SendIcon />}
                  sx={{ mt: 1 }}
                >
                  Send
                </Button>
              </form>
            </Box>
          ) : (
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              height={"100%"}
            >
              <Typography variant='h6'>Select a user to start chat</Typography>
            </Box>
          )}
        </StyledPaper>
      </Grid>
    </Grid>
  );
};

export default RealChat;
