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
import { useInstituicoes } from "../hooks/useInstituicoes";
import { useUser } from "../hooks/useUser";
import { Link } from "react-router-dom";
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
  const { cadastrar, loading, success } = useUser();

  const {
    instituicoes,
    loading: loadingInstituicoes,
    error: errorInstituicoes,
  } = useInstituicoes();

  const handleSubmit = async () => {
    if (
      !nome ||
      !email ||
      !senha ||
      !cpf ||
      !rg ||
      !endereco ||
      !instituicaoId ||
      !curso
    ) {
      setError("Preencha todos os campos antes de cadastrar.");
      return;
    }

    const dadosAluno = {
      nome,
      email,
      senha,
      cpf,
      rg,
      endereco,
      instituicaoId,
      curso,
    };

    await cadastrar(dadosAluno);
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
          {loadingInstituicoes ? (
            <MenuItem disabled>Carregando...</MenuItem>
          ) : errorInstituicoes ? (
            <MenuItem disabled>{errorInstituicoes}</MenuItem>
          ) : (
            instituicoes.map((inst: any) => (
              <MenuItem key={inst.id} value={inst.id}>
                {inst.nome}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>

      <TextField
        label="Curso"
        value={curso}
        onChange={(e) => setCurso(e.target.value)}
        fullWidth
      />
      {error && (
        <Typography color="red" sx={{ fontWeight: "bold" }}>
          {error}
        </Typography>
      )}

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
        {loading ? "Cadastrando..." : "Cadastrar"}
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
