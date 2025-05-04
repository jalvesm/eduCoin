import axios from "axios";
import { Vantagem, NovaVantagem  } from "../types/enterprise";

const API_BASE = "http://localhost:8080";

export const enterpriseService = {
  async criarVantagem(vantagem: NovaVantagem): Promise<void> { 
    await axios.post(`${API_BASE}/vantagens`, vantagem);
  },

  async listarVantagensPorEmpresa(empresaId: string): Promise<Vantagem[]> {
    const response = await axios.get<Vantagem[]>(`${API_BASE}/vantagens/empresa/${empresaId}`);
    return response.data;
  }  
};
