import axios from "axios";
import { Vantagem, NovaVantagem, Transacao } from "../types/enterprise";

const API_BASE = "http://localhost:8080";

export const enterpriseService = {
  async criarVantagem(vantagem: NovaVantagem): Promise<void> { 
    await axios.post(`${API_BASE}/vantagens`, vantagem);
  },

  async listarVantagensPorEmpresa(empresaId: string): Promise<Vantagem[]> {
    const response = await axios.get<Vantagem[]>(`${API_BASE}/vantagens/empresa/${empresaId}`);
    return response.data;
  } ,

  async listarTransacoesPorEmpresa(empresaId: string): Promise<Transacao[]> {
    const response = await axios.get<Transacao[]>(`${API_BASE}/transacoes/empresa/${empresaId}`);
    return response.data;
  }
};