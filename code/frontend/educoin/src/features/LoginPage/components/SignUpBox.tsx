import { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { useUser } from "../hooks/useUser";
import colors from "../../../shared/theme/colors";
import React from "react";

export default function LoginBox() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const { login, loading, success } = useUser();

  const handleSubmit = async () => {
    if (!email || !senha) {
      setError("Preencha todos os campos.");
      return;
    }

    const dadosLogin = {
      email,
      senha,
    };

    try {
      await login(dadosLogin);
      limparCampos();
    } catch (error) {
      setError("Erro ao realizar login.");
    }
  };

  const limparCampos = () => {
    setEmail("");
    setSenha("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
        maxWidth: "400px",
        margin: "0 auto",
        padding: 4,
        borderRadius: 2,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        backgroundColor: "white",
      }}
    >
      <LockIcon sx={{ color: "black", fontSize: 32 }} />
      <Typography variant="h5" sx={{ color: "black", fontWeight: "bold" }}>
        Login
      </Typography>

      {error && (
        <Typography color={colors.error} sx={{ fontWeight: "bold" }}>
          {error}
        </Typography>
      )}

      <TextField
        label="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        label="Senha"
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        fullWidth
      />

      {success && (
        <Typography color="green" sx={{ fontWeight: "bold" }}>
          Login realizado com sucesso!
        </Typography>
      )}

      <Button
        onClick={handleSubmit}
        variant="contained"
        sx={{
          mt: 2,
          backgroundColor: colors.lightBlue,
          color: colors.secondary,
          height: "48px",
          fontWeight: "bold",
          borderRadius: "10px",
        }}
        disabled={loading}
      >
        {loading ? "Entrando..." : "Login"}
      </Button>
    </Box>
  );
}
