import { useEffect, useState } from "react";
import { Vantagem } from "../types/enterprise";
import { enterpriseService } from "../services/enterpriseService";
import { NovaVantagem } from "../types/enterprise";

export function useEnterprise() {
  const [vantagens, setVantagens] = useState<Vantagem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);

  const carregarVantagens = async () => {
    setLoading(true);
    setErro(null);

    try {
      const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
      const empresaId = usuario.id;

      if (empresaId) {
        const data = await enterpriseService.listarVantagensPorEmpresa(empresaId); 
        setVantagens(data);
      } else {
        setErro("ID da empresa não encontrado.");
      }
    } catch (e) {
      setErro("Erro ao carregar vantagens");
    } finally {
      setLoading(false);
    }
  };

  const criarVantagem = async (novaVantagem: NovaVantagem) => {
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
