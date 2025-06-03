import axios from "axios";
import { Vantagem, Cupom, DetailTransactionData  } from "../types/student";

interface ResponseDTO {
  message: string;
  statusCode: number;
}

export const studentService = {
  async getAllVantagens(): Promise<Vantagem[]> {
    const response = await axios.get("http://localhost:8080/vantagens");
    return response.data;
  },

  async resgatarVantagem(alunoId: string, vantagemId: string): Promise<ResponseDTO> {
    const response = await axios.post<ResponseDTO>(
      "http://localhost:8080/alunos/resgatarVantagem",
      { alunoId, vantagemId }
    );
    return response.data;
  },

  async getCuponsDoAluno(alunoId: string): Promise<Cupom[]> {
    const response = await axios.get(`http://localhost:8080/cupons/cuponsDoAluno?alunoId=${alunoId}`);
    return response.data;
  },

  async getSaldoAluno(alunoId: string): Promise<number> {
    const response = await axios.get(`http://localhost:8080/alunos/saldo/${alunoId}`);
    return response.data; 
  },

  async getTransacoesDoAluno(alunoId: string): Promise<DetailTransactionData[]> {
    const response = await axios.get(`http://localhost:8080/transacoes/aluno/${alunoId}`);
    return response.data.map((t: DetailTransactionData) => ({
      ...t,
      dataTransacao: new Date(t.dataTransacao),
    }));
  }
  
};
