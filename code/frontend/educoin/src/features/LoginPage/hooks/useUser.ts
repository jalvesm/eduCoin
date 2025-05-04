import { useState } from "react";
import { loginUser } from "../services/userService";

export function useUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const login = async (dadosLogin) => {
    setLoading(true);
    setError("");
    setSuccess(false);
  
    try {
      const userData = await loginUser(dadosLogin);
  
      setSuccess(true);
      return userData; 
    } catch (err) {
      setError("Erro ao realizar login.");
      throw err; 
    } finally {
      setLoading(false);
    }
  };
  
  return { login, loading, error, success };
}
