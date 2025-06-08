import { useState } from "react";
import { resetPassword } from "../services/resetService";

export const useReset = () => {
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (email: string, novaSenha: string) => {
    setLoading(true);
    try {
      const result = await resetPassword(email, novaSenha);
      return {
        success: true,
        message: result.message || "Senha redefinida com sucesso.",
      };
    } catch (error: any) {
      return { success: false, message: error };
    } finally {
      setLoading(false);
    }
  };

  return { handleResetPassword, loading };
};
