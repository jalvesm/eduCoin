import { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import colors from "../../../shared/theme/colors";
import React from "react";

export default function SignUpBoxStudent() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cpf, setCpf] = useState("");
  const [rg, setRg] = useState("");
  const [endereco, setEndereco] = useState("");
  const [instituicaoId, setInstituicaoId] = useState("");
  const [curso, setCurso] = useState("");
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const handleSubmit = async () => {
    const dados = {
      nome,
      email,
      senha,
      cpf,
      rg,
      endereco,
      instituicaoId,
      curso,
    };

    try {
      console.log("Estudante cadastrado:", dados);
      setOpenModal(true);
      limparCampos();
    } catch {
      setError("Erro ao cadastrar estudante.");
    }
  };

  const limparCampos = () => {
    setNome("");
    setEmail("");
    setSenha("");
    setCpf("");
    setRg("");
    setEndereco("");
    setInstituicaoId("");
    setCurso("");
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
      }}
    >
      <Typography variant="h5" sx={{ color: colors.white, mb: 2 }}>
        Cadastro do Estudante
      </Typography>

      {error && (
        <Typography color={colors.error} sx={{ fontWeight: "bold" }}>
          {error}
        </Typography>
      )}

      <TextField
        label="Nome"
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
        label="CPF"
        value={cpf}
        onChange={(e) => setCpf(e.target.value)}
        fullWidth
      />
      <TextField
        label="RG"
        value={rg}
        onChange={(e) => setRg(e.target.value)}
        fullWidth
      />
      <TextField
        label="Endereço"
        value={endereco}
        onChange={(e) => setEndereco(e.target.value)}
        fullWidth
      />
      <TextField
        label="ID da Instituição"
        value={instituicaoId}
        onChange={(e) => setInstituicaoId(e.target.value)}
        fullWidth
      />
      <TextField
        label="Curso"
        value={curso}
        onChange={(e) => setCurso(e.target.value)}
        fullWidth
      />

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
      >
        Cadastrar
      </Button>
    </Box>
  );
}
