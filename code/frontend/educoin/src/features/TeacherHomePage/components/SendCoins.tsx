import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import HeaderMenu from "../../../shared/components/HeaderMenu/HeaderMenu";

const mockAlunos = [
  { id: 1, nome: "João da Silva" },
  { id: 2, nome: "Maria Oliveira" },
  { id: 3, nome: "Carlos Souza" },
];

export default function SendCoins() {
  const [aluno, setAluno] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [motivo, setMotivo] = useState("");

  const [modalMessage, setModalMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = () => {
    if (!aluno || !quantidade || !motivo) {
      setModalMessage("Por favor, preencha todos os campos.");
      setModalOpen(true);
      return;
    }

    console.log({ aluno, quantidade, motivo });

    setModalMessage("Moedas atribuídas com sucesso!");
    setModalOpen(true);
    setAluno("");
    setQuantidade("");
    setMotivo("");
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalMessage("");
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
          fullWidth
          onClick={handleSubmit}
          sx={{
            backgroundColor: "#90caf9",
            color: "#fff",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#64b5f6",
            },
          }}
        >
          Enviar Moedas
        </Button>
      </Box>

      <Dialog
        open={modalOpen}
        onClose={handleCloseModal}
        maxWidth="sm"
        PaperProps={{
          sx: {
            p: 3,
            borderRadius: 3,
            textAlign: "center",
          },
        }}
      >
        <DialogContent>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {modalMessage}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            onClick={handleCloseModal}
            sx={{
              mt: 1,
              px: 4,
              py: 1,
              fontWeight: "bold",
              backgroundColor: "#A7C7E7",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#90b8db",
              },
            }}
          >
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
