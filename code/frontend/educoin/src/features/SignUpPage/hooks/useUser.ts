import { useState } from "react";
import { cadastrarAluno } from "../services/userService";

export function useUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const cadastrar = async (dadosAluno) => {
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await cadastrarAluno(dadosAluno);
      setSuccess(true);
    } catch (err) {
      setError("Erro ao cadastrar aluno.");
    } finally {
      setLoading(false);
    }
  };

  const cadastrarEmpresa = async (dadosEmpresa) => {
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await cadastrarEmpresa(dadosEmpresa);
      setSuccess(true);
    } catch (err) {
      setError("Erro ao cadastrar empresa.");
    } finally {
      setLoading(false);
    }
  };

  const loginUsuario = async (dadosUsuario) => {
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await loginUsuario(dadosUsuario);
      setSuccess(true);
    } catch (err) {
      setError("Erro ao acessar sistema.");
    } finally {
      setLoading(false);
    }
  };

  return { cadastrar, cadastrarEmpresa, loginUsuario, loading, error, success };
}
