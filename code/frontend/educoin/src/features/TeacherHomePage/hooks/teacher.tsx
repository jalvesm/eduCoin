import { useEffect, useState } from "react";
import { getSaldoProfessor } from "../service/teacherService";

export const useTeacher = (idProfessor: string) => {
  const [saldo, setSaldo] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const fetchSaldo = async () => {
      try {
        const valor = await getSaldoProfessor(idProfessor);
        setSaldo(valor);
      } catch (error) {
        setErro("Erro ao carregar saldo.");
      } finally {
        setLoading(false);
      }
    };

    if (idProfessor) {
      fetchSaldo();
    } else {
      setErro("ID do professor inválido.");
      setLoading(false);
    }
  }, [idProfessor]);

  return { saldo, loading, erro };
};
