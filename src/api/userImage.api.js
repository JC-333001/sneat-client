import axios from "axios";

// const URL = "https://sneat-backend-e54d9967a82c.herokuapp.com";
// const URL = "http://127.0.0.1:3000";

export async function createImage(file, userId) {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("userId", userId);
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/images`,
      formData
    );
    console.log(
      "successfully create an image with url=",
      response.data.imageUrl
    );
    return response;
  } catch (e) {
    console.error("Fail to create image in AWS", e);
  }
}

export async function getImage(id) {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/images/${id}`
  );
  return response;
}
