import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import HeaderMenu from "../../../shared/components/HeaderMenu/HeaderMenu";

// Mock de alunos
const mockAlunos = [
  { id: 1, nome: "João da Silva" },
  { id: 2, nome: "Maria Oliveira" },
  { id: 3, nome: "Carlos Souza" },
];

export default function SendCoins() {
  const [aluno, setAluno] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [motivo, setMotivo] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!aluno || !quantidade || !motivo) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    console.log({ aluno, quantidade, motivo });

    setSuccess(true);
    setAluno("");
    setQuantidade("");
    setMotivo("");
    setError("");
  };

  return (
    <>
      <HeaderMenu />
      <Box sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          color="#90caf9"
          mb={3}
          display="flex"
          alignItems="center"
          gap={1}
        >
          <MonetizationOnIcon /> Atribuir Moedas ao Aluno
        </Typography>

        <TextField
          select
          fullWidth
          label="Selecione o Aluno"
          value={aluno}
          onChange={(e) => setAluno(e.target.value)}
          sx={{ mb: 3 }}
        >
          {mockAlunos.map((aluno) => (
            <MenuItem key={aluno.id} value={aluno.nome}>
              {aluno.nome}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          label="Quantidade de Moedas"
          type="number"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          sx={{ mb: 3 }}
          inputProps={{ min: 1 }}
        />

        <TextField
          fullWidth
          label="Motivo da Atribuição"
          multiline
          rows={4}
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
          sx={{ mb: 4 }}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
        >
          Enviar Moedas
        </Button>

        <Snackbar
          open={success}
          autoHideDuration={3000}
          onClose={() => setSuccess(false)}
        >
          <Alert severity="success">Moedas atribuídas com sucesso!</Alert>
        </Snackbar>

        <Snackbar
          open={!!error}
          autoHideDuration={3000}
          onClose={() => setError("")}
        >
          <Alert severity="error">{error}</Alert>
        </Snackbar>
      </Box>
    </>
  );
}
