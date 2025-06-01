import { useEffect, useState } from "react";
import { studentService } from "../service/studentService";
import { Vantagem } from "../types/student";

interface ResponseDTO {
  message: string;
  statusCode: number;
}

export function useStudentVantagens() {
  const [vantagens, setVantagens] = useState<Vantagem[]>([]);
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

  async function resgatarVantagem(alunoId: string, vantagemId: string): Promise<ResponseDTO> {
    return await studentService.resgatarVantagem(alunoId, vantagemId);
  }

  return { vantagens, loading, erro, resgatarVantagem };
}
