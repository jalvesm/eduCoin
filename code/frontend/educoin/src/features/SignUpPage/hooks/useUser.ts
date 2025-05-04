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

  return { cadastrar, loading, error, success };
}
