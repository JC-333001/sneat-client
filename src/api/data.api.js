import axios from "axios";

export async function grabGrowthData() {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/growth`
    );
    if (response.status === 200) {
      setData(response.data);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    if (error.response.status == 403) {
      navigate("/login");
    }
  }
}
