import { useCallback, useEffect, useState } from "react";
import { studentService } from "../service/studentService";
import { Vantagem, DetailTransactionData } from "../types/student";

interface ResponseDTO {
  message: string;
  statusCode: number;
}

export function useStudentVantagens() {
  const [transacoes, setTransacoes] = useState<DetailTransactionData[]>([]);
  const [vantagens, setVantagens] = useState<Vantagem[]>([]);
  const [cupons, setCupons] = useState<any[]>([]);
  const [saldo, setSaldo] = useState<number>(0);
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

  const getSaldoAluno = useCallback(async (alunoId: string) => {
    setLoading(true);
    setErro("");
    try {
      const valor = await studentService.getSaldoAluno(alunoId);
      setSaldo(valor);
    } catch {
      setErro("Erro ao carregar saldo.");
    } finally {
      setLoading(false);
    }
  }, []);

  const getTransacoesDoAluno = useCallback(async (alunoId: string) => {
    setLoading(true);
    setErro("");
    try {
      const data = await studentService.getTransacoesDoAluno(alunoId);
      setTransacoes(data);
    } catch (e) {
      setErro("Erro ao carregar transações");
    } finally {
      setLoading(false);
    }
  }, []);
  
  return { vantagens, cupons, saldo, transacoes, loading, erro, resgatarVantagem, getCuponsDoAluno, setCupons, getSaldoAluno, getTransacoesDoAluno  };
}
