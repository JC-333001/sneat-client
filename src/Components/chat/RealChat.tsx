import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { io, Socket } from "socket.io-client";
import { User } from "../../routes/Profile";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Button,
  Grid,
  Paper,
} from "@mui/material";
import { getAllUser } from "../../api/user.api";

interface Message {
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
}

const SOCKET_SERVER_URL = process.env.REACT_APP_BACKEND_URL;
const CONNECTION_TIMEOUT = 6000; // 2 minutes in milliseconds

const RealChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [chatUsers, setChatUsers] = useState<User[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("User");
    if (!token) {
      navigate("/login");
      return;
    }
    const decoded = jwtDecode<User>(token);
    setUserId(decoded._id);
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
  }, [navigate]);

  useEffect(() => {
    if (!socket) return;

    // Listen for the chat history from the server
    socket.on("user_chat_history", (history: Message[]) => {
      setMessages(history);
    });

    // Request chat history when a user is selected
    if (selectedUser) {
      console.log(selectedUser._id);
      socket.emit("get chat history", {
        userId,
        selectedUserId: selectedUser._id,
      });
    }
  }, [socket, selectedUser, userId]);

  const fetchChatUsers = async () => {
    const users = await getAllUser();
    setChatUsers(users);
  };

  const sendMessage = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (selectedUser && socket) {
        const newMessage = {
          senderId: userId,
          receiverId: inputMessage,
          content: new Date(),
        };
        socket.emit("send message", newMessage);
        setInputMessage("");
      }
    },
    [inputMessage, selectedUser, socket, userId]
  );

  return (
    <Grid container spacing={2}>
      {/* User list */}
      <Grid item xs={3}>
        <Paper>
          <List>
            {chatUsers.map((user) => (
              <ListItem
                component='button'
                key={user._id}
                onClick={() => setSelectedUser(user)}
              >
                <ListItemAvatar>
                  <Avatar src={user.imageUrl} />
                </ListItemAvatar>
                <ListItemText primary={user.name} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>

      {/* Chat area */}
      <Grid item xs={9}>
        <Paper style={{ height: "400px", overflowY: "auto", padding: "16px" }}>
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <div key={index}>
                <strong>
                  {message.senderId === userId ? "You" : selectedUser?.name}:{" "}
                </strong>
                <span>{message.content}</span>
                <small>
                  {new Date(message.timestamp).toLocaleTimeString()}
                </small>
              </div>
            ))
          ) : (
            <div>No messages yet</div>
          )}
        </Paper>
        <form onSubmit={sendMessage} style={{ marginTop: "16px" }}>
          <TextField
            fullWidth
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder='Type a message'
            disabled={!selectedUser}
          />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            style={{ marginTop: "8px" }}
          >
            Send
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default RealChat;
