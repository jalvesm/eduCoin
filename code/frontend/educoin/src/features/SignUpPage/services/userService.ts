import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export const cadastrarAluno = async (dadosAluno) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/usuarios`, {
      ...dadosAluno,
      tipoUsuario: "ALUNO",
      saldoMoedas: 0.0, 
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar aluno:", error);
    throw error;
  }
};

export const cadastrarEmpresa = async (dadosEmpresa) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/usuarios`, {
      ...dadosEmpresa
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar empresa:", error);
    throw error;
  }
};


