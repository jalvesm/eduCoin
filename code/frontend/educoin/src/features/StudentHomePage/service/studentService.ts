import axios from "axios";
import { Vantagem } from "../types/student";

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
};
