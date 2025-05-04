import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export const loginUser = async (dadosLogin) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, dadosLogin, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const userData = response.data;
    localStorage.setItem("usuario", JSON.stringify(userData));
    return userData;
  } catch (error) {
    console.error("Erro ao realizar login:", error.response?.data || error.message);
    throw error;
  }
};


