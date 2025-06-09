import axios from "axios";

export const resetPassword = async (email: string, novaSenha: string) => {
  try {
    const response = await axios.put("http://localhost:8080/usuarios/reset-senha", {
      email,
      novaSenha,
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "Erro ao redefinir senha.";
  }
};
