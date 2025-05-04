import { useEffect, useState } from "react";
import { Vantagem } from "../types/enterprise";
import { enterpriseService } from "../services/enterpriseService";

export function useEnterprise() {
  const [vantagens, setVantagens] = useState<Vantagem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);

  const carregarVantagens = async () => {
    setLoading(true);
    setErro(null);
    try {
      const data = await enterpriseService.listarVantagens();
      setVantagens(data);
    } catch (e) {
      setErro("Erro ao carregar vantagens");
    } finally {
      setLoading(false);
    }
  };

  const criarVantagem = async (novaVantagem: Omit<Vantagem, "id">) => {
    try {
      await enterpriseService.criarVantagem(novaVantagem);
      await carregarVantagens(); 
    } catch (e) {
      setErro("Erro ao criar vantagem");
    }
  };

  useEffect(() => {
    carregarVantagens();
  }, []);

  return { vantagens, loading, erro, criarVantagem, carregarVantagens };
}
