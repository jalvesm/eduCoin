import { useCallback, useEffect, useState } from "react";
import { studentService } from "../service/studentService";
import { Vantagem } from "../types/student";

interface ResponseDTO {
  message: string;
  statusCode: number;
}

export function useStudentVantagens() {
  const [vantagens, setVantagens] = useState<Vantagem[]>([]);
  const [cupons, setCupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await studentService.getAllVantagens();
        setVantagens(data);
      } catch (e) {
        setErro("Erro ao carregar vantagens.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const getCuponsDoAluno = useCallback(async (alunoId: string) => {
    setLoading(true);
    setErro("");
    try {
      const data = await studentService.getCuponsDoAluno(alunoId);
      setCupons(data);
    } catch {
      setErro("Erro ao carregar cupons.");
    } finally {
      setLoading(false);
    }
  }, []);
  

  async function resgatarVantagem(alunoId: string, vantagemId: string): Promise<ResponseDTO> {
    return await studentService.resgatarVantagem(alunoId, vantagemId);
  }

  return { vantagens, cupons, loading, erro, resgatarVantagem, getCuponsDoAluno, setCupons  };
}
