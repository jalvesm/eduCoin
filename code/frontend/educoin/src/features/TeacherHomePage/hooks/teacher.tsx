import { useEffect, useState, useCallback } from "react";
import { teacherService } from "../service/teacherService";
import { DetailTransactionData } from "../types/teacher";

export const useTeacher = (idProfessor: string) => {
  const [transacoes, setTransacoes] = useState<DetailTransactionData[]>([]);
  const [saldo, setSaldo] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);

  const getTransacoesDoProfessor = useCallback(async (professorId: string) => {
    setLoading(true);
    setErro(null);
    try {
      const data = await teacherService.getTransacoesDoProfessor(professorId);
      setTransacoes(data);
    } catch {
      setErro("Erro ao carregar transações.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchDados = async () => {
      if (!idProfessor) {
        setErro("ID do professor inválido.");
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const valor = await teacherService.getSaldoProfessor(idProfessor);
        setSaldo(valor);
        await getTransacoesDoProfessor(idProfessor);
      } catch {
        setErro("Erro ao carregar dados do professor.");
      } finally {
        setLoading(false);
      }
    };

    fetchDados();
  }, [idProfessor, getTransacoesDoProfessor]);

  const atribuirMoedas = useCallback(
    async (
      professorId: string,
      alunoId: string,
      valor: number,
      descricao: string
    ) => {
      setLoading(true);
      setErro(null);
      try {
        const body = { alunoId, valor, descricao };
        await teacherService.atribuirMoedas(professorId, body);
      } catch (error) {
        console.error(error);
        setErro("Erro ao atribuir moedas.");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { transacoes, saldo, atribuirMoedas, loading, erro };
};
