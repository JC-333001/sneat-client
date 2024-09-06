import axios from "axios";

const URL = "http://localhost:3000";

export async function createUser(user) {
  const response = await axios.post(`${URL}/users`, user);
  return response;
}

export async function deleteUser(id) {
  const response = await axios.delete(`${URL}/users/${id}`);
  return response;
}

export async function getUser(id) {
  const response = await axios.get(`${URL}/users/${id}`);
  if (response.status === 200) {
    return response.data;
  } else {
    return;
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

export async function verifyUser(user) {
  const response = await axios.post(`${URL}/users/login`, user);
  //   console.log("verify user", response);
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
