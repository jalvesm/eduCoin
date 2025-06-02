import { useState, useEffect } from "react";
import { Aluno } from "../types/aluno";
import { teacherService } from "../service/teacherService";

export function useAlunos() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAlunos() {
      try {
        const dados: Aluno[] = await teacherService.getAlunos();
        setAlunos(dados);
      } catch (err) {
        setErro("Erro ao buscar alunos.");
      } finally {
        setLoading(false);
      }
    }

    fetchAlunos();
  }, []);

  return { alunos, loading, erro };
}
