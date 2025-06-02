import axios from "axios";

const API_URL = "http://localhost:8080";

export const getAlunos = async () => {
  const response = await axios.get(`${API_URL}/alunos`);
  return response.data;
};

export const getSaldoProfessor = async (id: string): Promise<number> => {
  const response = await axios.get(`${API_URL}/professores/saldo/${id}`);
  return response.data; 
};