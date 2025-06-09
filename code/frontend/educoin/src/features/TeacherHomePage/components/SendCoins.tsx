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
import { useTeacher } from "../hooks/teacher";

export default function SendCoins() {
  const [aluno, setAluno] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [motivo, setMotivo] = useState("");
  const [search, setSearch] = useState("");

  const [modalMessage, setModalMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
  const idProfessor = usuario?.id;

  const { alunos, loading: loadingAlunos, erro: erroAlunos } = useAlunos();
  const {
    atribuirMoedas,
    loading: loadingTeacher,
    erro: erroTeacher,
  } = useTeacher(idProfessor);

  const alunosFiltrados = alunos.filter((aluno) =>
    aluno.nome.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = async () => {
    if (!aluno || !quantidade || !motivo) {
      setModalMessage("Por favor, preencha todos os campos.");
      setModalOpen(true);
      return;
    }

    try {
      await atribuirMoedas(idProfessor, aluno, Number(quantidade), motivo);
      setModalMessage("Moedas atribuídas com sucesso!");
      setAluno("");
      setQuantidade("");
      setMotivo("");
      setSearch("");
    } catch {
      setModalMessage("Falha ao atribuir moedas. Tente novamente.");
    } finally {
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalMessage("");
  };

  return (
    <>
      <HeaderMenu />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
        }}
      >
        <Box
          sx={{
            backgroundColor: "#fff",
            borderRadius: 4,
            boxShadow: 3,
            p: 4,
            width: "100%",
            maxWidth: 500,
          }}
        >
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

          {loadingAlunos ? (
            <Typography>Carregando alunos...</Typography>
          ) : erroAlunos ? (
            <Typography color="error">{erroAlunos}</Typography>
          ) : (
            <>
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
                disabled={loadingTeacher}
                sx={{
                  backgroundColor: "#90caf9",
                  color: "#fff",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#64b5f6",
                  },
                }}
              >
                {loadingTeacher ? "Enviando..." : "Enviar Moedas"}
              </Button>
            </>
          )}
        </Box>
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
