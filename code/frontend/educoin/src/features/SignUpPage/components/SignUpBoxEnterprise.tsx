import { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import BusinessIcon from "@mui/icons-material/Business";
import { useUser } from "../hooks/useUser";
import colors from "../../../shared/theme/colors";
import React from "react";

export default function SignUpBoxCompany() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [error, setError] = useState("");
  const { cadastrarEmpresa, loading, success } = useUser();

  const handleSubmit = async () => {
    if (!nome || !email || !senha || !cnpj) {
      setError("Preencha todos os campos antes de cadastrar.");
      return;
    }

    const dadosEmpresa = {
      nome,
      email,
      senha,
      cnpj,
      tipoUsuario: "EMPRESA",
    };

    try {
      await cadastrarEmpresa(dadosEmpresa);
      limparCampos();
    } catch (error) {
      setError("Erro ao cadastrar empresa.");
    }
  };

  const limparCampos = () => {
    setNome("");
    setEmail("");
    setSenha("");
    setCnpj("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
        maxWidth: "500px",
        margin: "0 auto",
        padding: 4,
        borderRadius: 2,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        backgroundColor: "white",
      }}
    >
      <BusinessIcon sx={{ color: "black", fontSize: 32 }} />
      <Typography variant="h5" sx={{ color: "black", fontWeight: "bold" }}>
        Cadastro de Empresa
      </Typography>

      {error && (
        <Typography color={colors.error} sx={{ fontWeight: "bold" }}>
          {error}
        </Typography>
      )}

      <TextField
        label="Nome da Empresa"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        fullWidth
      />
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
      <TextField
        label="CNPJ"
        value={cnpj}
        onChange={(e) => setCnpj(e.target.value)}
        fullWidth
      />

      {success && (
        <Typography color="green" sx={{ fontWeight: "bold" }}>
          Cadastro realizado com sucesso!
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
        {loading ? "Cadastrando..." : "Cadastrar Empresa"}
      </Button>
      <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
        Ja possui uma conta?{" "}
        <Link
          to="/login"
          style={{
            color: colors.secondary,
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          Acesse aqui
        </Link>
      </Typography>
    </Box>
  );
}
