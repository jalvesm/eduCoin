import { useEffect, useState } from "react";
import { studentService } from "../service/studentService";
import { Vantagem } from "../types/student";

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

  return { vantagens, loading, erro };
}