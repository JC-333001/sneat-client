import axios from "axios";
import { createImage, getImage } from "./userImage.api";
import { process } from "ipaddr.js";

// const URL = "https://sneat-backend-e54d9967a82c.herokuapp.com";
const URL = process.env.REACT_APP_BACKEND_URL;

export async function createUser(user) {
  const response = await axios.post(`${URL}/users`, user);
  return response;
}

export async function deleteUser(id) {
  const response = await axios.delete(`${URL}/users/${id}`);
  return response;
}

export async function getUser(id) {
  try {
    const response = await axios.get(`${URL}/users/${id}`);
    const user = response.data;
    // const imageData = await getImage(user.imageId);
    // user.image = imageData;
    return user;
  } catch (e) {
    console.error("Can't get this user's info", e);
  }
}

export async function getAllUser() {
  const response = await axios.get(`${URL}/users`);
  if (response.status === 200) {
    return response.data;
  } else {
    return;
  }
}

export async function updateUser(id, user) {
  const response = await axios.put(`${URL}/users/${id}`, user);
  return response;
}

export async function updateUserImage(id, user, image) {
  const data = await createImage(image);
  console.log(data);
  const imageId = data.data.VersionId;
  user.imageId = imageId;
  const response = await axios.put(`${URL}/users/${id}`, user);
  return response;
}

export async function verifyUser(user) {
  const response = await axios.post(`${URL}/users/login`, user);
  if (response.data.success) {
    return response.data.token;
  } else {
    throw new Error(response.data.message);
  }
}

// export async function verifyToken(token) {
//   const response = await axios.post(`${URL}/users/login`, user);
//   //   console.log("verify user", response);
//   if (response.data.success) {
//     return response.data.token;
//   } else {
//     throw new Error(response.data.message);
//   }
// }
