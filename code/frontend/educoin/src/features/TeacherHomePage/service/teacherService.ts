import axios from "axios";
import { DetailTransactionData } from "../types/teacher";

const API_URL = "http://localhost:8080";

export const teacherService = {
  async getAlunos() {
    const response = await axios.get(`${API_URL}/alunos`);
    return response.data;
  },

  async getSaldoProfessor(id: string): Promise<number> {
    const response = await axios.get(`${API_URL}/professores/saldo/${id}`);
    return response.data; 
  },

  async getTransacoesDoProfessor(professorId: string): Promise<DetailTransactionData[]> {
    const response = await axios.get(`${API_URL}/transacoes/usuario/${professorId}`);
    return response.data;
  }
};
