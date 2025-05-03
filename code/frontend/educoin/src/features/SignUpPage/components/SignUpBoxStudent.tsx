import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
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

  const instituicoes = [
    {
      id: "d84995e7-9b12-4b4e-b26b-86cc88d3b5e4",
      nome: "Universidade Central",
    },
    { id: "a1234567-bc89-4de0-9999-123456789abc", nome: "Instituto Federal" },
    { id: "b9876543-zz22-4de0-aaaa-987654321aaa", nome: "Faculdade Alfa" },
  ];

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
        padding: 4,
        borderRadius: 2,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        backgroundColor: "white",
      }}
    >
      <PersonAddIcon sx={{ color: "black", fontSize: 32 }} />
      <Typography variant="h5" sx={{ color: "black", fontWeight: "bold" }}>
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

      <FormControl fullWidth>
        <InputLabel id="instituicao-label">Instituição</InputLabel>
        <Select
          labelId="instituicao-label"
          value={instituicaoId}
          label="Instituição"
          onChange={(e) => setInstituicaoId(e.target.value)}
        >
          {instituicoes.map((inst) => (
            <MenuItem key={inst.id} value={inst.id}>
              {inst.nome}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

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
