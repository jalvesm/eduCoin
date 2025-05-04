import axios from "axios";
import { Vantagem, NovaVantagem  } from "../types/enterprise";

const API_BASE = "http://localhost:8080";

export const enterpriseService = {
  async listarVantagens(): Promise<Vantagem[]> {
    const response = await axios.get<Vantagem[]>(`${API_BASE}/vantagens`);
    return response.data;
  },

  async criarVantagem(vantagem: NovaVantagem): Promise<void> { 
    await axios.post(`${API_BASE}/vantagens`, vantagem);
  },
};
