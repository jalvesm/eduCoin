import { useEffect, useState } from "react";
import { listarInstituicoes } from "../services/institutionService";

export function useInstituicoes() {
  const [instituicoes, setInstituicoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await listarInstituicoes();
        console.log("Instituições carregadas:", data); 
        setInstituicoes(data);
      } catch (err) {
        setError("Erro ao carregar instituições.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  
  return { instituicoes, loading, error };
}
