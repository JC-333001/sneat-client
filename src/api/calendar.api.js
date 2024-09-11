import axios from "axios";
import { process } from "ipaddr.js";

// const URL = "https://sneat-backend-e54d9967a82c.herokuapp.com";
const URL = process.env.REACT_APP_BACKEND_URL;

export async function createEvent(eventList, id) {
  //   console.log("in createEvents", id);
  const response = await axios.post(`${URL}/calendar`, {
    events: eventList,
    userId: id,
  });
  return response;
}

export async function updateEvents(eventList, id) {
  console.log("in api", eventList);
  const response = await axios.put(`${URL}/calendar/${id}`, {
    events: eventList,
    userId: id,
  });
  return response;
}

export async function getEvents(id) {
  try {
    const response = await axios.get(`${URL}/calendar/${id}`);
    const events = response.data.events;
    return events;
  } catch (e) {
    console.error("Can't get this user's events", e);
  }
}
