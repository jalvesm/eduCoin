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
import { useAlunos } from "../hooks/aluno";

export default function SendCoins() {
  const [aluno, setAluno] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [motivo, setMotivo] = useState("");
  const [search, setSearch] = useState("");

  const [modalMessage, setModalMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const { alunos, loading, erro } = useAlunos();

  const alunosFiltrados = alunos.filter((aluno) =>
    aluno.nome.toLowerCase().includes(search.toLowerCase())
  );

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
    setSearch("");
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

        {loading ? (
          <Typography>Carregando alunos...</Typography>
        ) : erro ? (
          <Typography color="error">{erro}</Typography>
        ) : (
          <>
            {/* Campo de busca */}
            <TextField
              fullWidth
              label="Buscar Aluno"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ mb: 2 }}
            />

            <TextField
              select
              fullWidth
              label="Selecione o Aluno"
              value={aluno}
              onChange={(e) => setAluno(e.target.value)}
              sx={{ mb: 3 }}
            >
              {alunosFiltrados.length > 0 ? (
                alunosFiltrados.map((aluno) => (
                  <MenuItem key={aluno.id} value={aluno.id}>
                    {aluno.nome}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Nenhum aluno encontrado</MenuItem>
              )}
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
          </>
        )}
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
