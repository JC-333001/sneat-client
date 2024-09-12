import axios from "axios";

const URL = process.env.REACT_APP_BACKEND_URL;

export async function askAI(userPrompt) {
  const response = await axios.post(`${URL}/chat/ask-ai`, { userPrompt });
  return response;
}

export async function getUserChatHistory(userId, otherUserId) {
  const response = await axios.get(
    `${URL}/chat/history/${userId}/${otherUserId}`
  );
  return response;
}

export async function sendMessageToUser(senderId, receiverId, content) {
  const response = await axios.post(`${URL}/chat/send-message`, {
    senderId,
    receiverId,
    content,
  });
  return response;
}

export async function getMessagedUsers(userId) {
  const response = await axios.get(`${URL}/chat/messaged-users/${userId}`);
  return response.data;
}
