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
  AppBar,
  Toolbar,
  Drawer,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";

import { styled } from "@mui/system";
import { getUser, getAllUser } from "../../api/user.api";
import userPhoto from "../../img/profile/user-photo.png";

interface Message {
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
}

interface ChatHistory {
  chat: Message[];
  chatUser: string;
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
  const [inputMessage, setInputMessage] = useState("");
  const [user, setUser] = useState<User>({} as User);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [chatUsers, setChatUsers] = useState<User[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:900px)");

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
      fetchChatUsers(decoded._id);

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
    socket.on("user_chat_history", (chatHistory: ChatHistory[]) => {
      setChatHistory(chatHistory);
    });

    if (chatUsers.length > 0) {
      socket.emit("get chat history", {
        userId: user._id,
        chatUsers: chatUsers,
      });
    }

    // Clean up listeners
    return () => {
      socket.off("user_chat_history");
      socket.off("new message");
    };
  }, [socket, user._id, chatUsers]);

  const fetchChatUsers = async (userId: string) => {
    const users = await getAllUser();
    setChatUsers(users.filter((singleUser) => singleUser._id !== userId));
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.length > 0) {
      const users = await getAllUser();
      setChatUsers(
        users.filter(
          (user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            user._id !== user._id
        )
      );
    } else {
      fetchChatUsers(user._id);
    }
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
        setChatHistory((prevChatHistory) => [
          ...prevChatHistory,
          { chat: [newMessage], chatUser: selectedUser._id },
        ]);
        setInputMessage("");
      }
    },
    [inputMessage, selectedUser, socket, user._id]
  );

  console.log(chatHistory);

  return (
    <Grid
      container
      sx={{ height: "80vh", borderRadius: "10px", overflow: "hidden" }}
    >
      {/* Sidebar */}
      {!isMobile && (
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
                <Avatar src={user.imageUrl || userPhoto} />
              </ListItemAvatar>
              <form
                onSubmit={handleSearch}
                style={{ display: "flex", alignItems: "center" }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder='Search users'
                  inputProps={{ "aria-label": "search users" }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <IconButton
                  type='submit'
                  sx={{ p: "10px" }}
                  aria-label='search'
                >
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
                {chatUsers.length > 0
                  ? chatUsers.map((chatUser) => (
                      <ListItem
                        button
                        key={chatUser._id}
                        onClick={() => setSelectedUser(chatUser)}
                        selected={selectedUser?._id === chatUser._id}
                      >
                        <ListItemAvatar>
                          <Avatar src={chatUser.imageUrl || userPhoto} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={chatUser.name}
                          secondary={
                            chatHistory
                              .find((chat) => chat.chatUser === chatUser._id)
                              ?.chat.at(-1)?.content ?? "No messages yet"
                          }
                        />
                      </ListItem>
                    ))
                  : "No users found"}
              </List>
            </Box>
          </StyledPaper>
        </Grid>
      )}

      {/* Mobile Drawer */}
      <Drawer
        anchor='left'
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box sx={{ width: 250 }}>
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
                <Avatar src={user.imageUrl || userPhoto} />
              </ListItemAvatar>
              <form
                onSubmit={handleSearch}
                style={{ display: "flex", alignItems: "center" }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder='Search users'
                  inputProps={{ "aria-label": "search users" }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <IconButton
                  type='submit'
                  sx={{ p: "10px" }}
                  aria-label='search'
                >
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
                {chatUsers.length > 0
                  ? chatUsers.map((chatUser) => (
                      <ListItem
                        button
                        key={chatUser._id}
                        onClick={() => setSelectedUser(chatUser)}
                        selected={selectedUser?._id === chatUser._id}
                      >
                        <ListItemAvatar>
                          <Avatar src={chatUser.imageUrl || userPhoto} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={chatUser.name}
                          secondary={
                            chatHistory
                              .find((chat) => chat.chatUser === chatUser._id)
                              ?.chat.at(-1)?.content ?? "No messages yet"
                          }
                        />
                      </ListItem>
                    ))
                  : "No users found"}
              </List>
            </Box>
          </StyledPaper>
        </Box>
      </Drawer>

      {/* Chat area */}
      <Grid item xs={isMobile ? 12 : 9} sx={{ height: "100%" }}>
        <StyledPaper elevation={0} sx={{ height: "100%" }}>
          {selectedUser ? (
            <Box display={"flex"} flexDirection={"column"} height={"100%"}>
              {/* Chat header */}
              <Box>
                <ListItem sx={{ height: "70px" }}>
                  {isMobile && (
                    <IconButton
                      edge='start'
                      color='inherit'
                      aria-label='menu'
                      onClick={() => setIsDrawerOpen(true)}
                      sx={{ mr: 2 }}
                    >
                      <MenuIcon />
                    </IconButton>
                  )}
                  <ListItemAvatar>
                    <Avatar src={selectedUser.imageUrl || userPhoto} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={selectedUser.name}
                    secondary='Frontend Developer'
                  />
                </ListItem>
                <Divider />
              </Box>

              <Box
                display={"flex"}
                flexDirection={"column"}
                height={"100%"}
                justifyContent={"space-between"}
              >
                {/* Messages */}
                <div
                  style={{ flexGrow: 1, overflowY: "auto", padding: "16px" }}
                >
                  {chatHistory.length > 0
                    ? chatHistory
                        .filter((chat) => chat.chatUser === selectedUser._id)
                        .flatMap((chatHis) => chatHis.chat)
                        .map((chatHis, index) => (
                          <Box
                            key={index}
                            display='flex'
                            alignItems='center'
                            width='100%'
                            justifyContent={
                              chatHis.senderId === user._id
                                ? "flex-end"
                                : "flex-start"
                            }
                          >
                            {chatHis.senderId !== user._id ? (
                              <Avatar
                                src={selectedUser.imageUrl || userPhoto}
                              />
                            ) : (
                              ""
                            )}
                            <ChatBubble
                              key={index}
                              isCurrentUser={chatHis.senderId === user._id}
                              sx={{
                                width: "fit-content",
                                maxWidth: "70%",
                                margin: "5px",
                              }}
                            >
                              {chatHis.content}
                            </ChatBubble>
                            {chatHis.senderId === user._id ? (
                              <Avatar src={user.imageUrl || userPhoto} />
                            ) : (
                              ""
                            )}
                          </Box>
                        ))
                    : "No messages found"}
                </div>
                {/* Message input */}

                <form
                  onSubmit={sendMessage}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
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
                    sx={{
                      marginRight: "10px",
                      marginLeft: "10px",
                      marginBottom: "10px",
                    }}
                  />
                  <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    endIcon={<SendIcon />}
                    sx={{ mt: 1, marginRight: "10px", marginBottom: "10px" }}
                  >
                    Send
                  </Button>
                </form>
              </Box>
            </Box>
          ) : (
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              height={"100%"}
            >
              {isMobile && (
                <IconButton
                  edge='start'
                  color='inherit'
                  aria-label='menu'
                  onClick={() => setIsDrawerOpen(true)}
                  sx={{ position: "absolute", top: 10, left: 10 }}
                >
                  <MenuIcon />
                </IconButton>
              )}
              <Typography variant='h6'>Select a user to start chat</Typography>
            </Box>
          )}
        </StyledPaper>
      </Grid>
    </Grid>
  );
};

export default RealChat;
