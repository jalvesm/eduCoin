import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Alert,
} from "@mui/material";
import HeaderMenu from "../../../shared/components/HeaderMenu/HeaderMenu";
import { useStudentVantagens } from "../hooks/student";

export default function ListAdvantages() {
  const { vantagens, loading, erro, resgatarVantagem } = useStudentVantagens();
  const [resgateStatus, setResgateStatus] = useState<string | null>(null);
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
  const alunoId = usuario.id;

  const handleResgatarVantagem = async (vantagemId: string) => {
    try {
      const response = await resgatarVantagem(alunoId, vantagemId);
      setResgateStatus(response.message);
    } catch (error) {
      setResgateStatus("Erro ao resgatar vantagem.");
      console.error("Erro ao resgatar vantagem:", error);
    }
  };

  const handleCloseModal = () => {
    setResgateStatus(null);
  };

  return (
    <>
      <HeaderMenu />
      <Box sx={{ p: 4 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", mb: 3, color: "#A7C7E7" }}
        >
          Vantagens Disponíveis
        </Typography>

        {loading && <CircularProgress />}
        {erro && <Alert severity="error">{erro}</Alert>}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: 6,
          }}
        >
          {vantagens.map((vantagem) => (
            <Box key={vantagem.id} sx={{ width: "300px" }}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  minHeight: 380,
                  justifyContent: "space-between",
                }}
              >
                <CardMedia
                  component="img"
                  height="160"
                  image={vantagem.imagem}
                  alt={vantagem.titulo}
                />
                <CardContent
                  sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
                >
                  <Typography variant="h6">{vantagem.titulo}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {vantagem.descricao}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ mt: 1, fontWeight: "bold" }}
                  >
                    Custo: {vantagem.custoMoedas} moedas
                  </Typography>
                  <Box sx={{ flexGrow: 1 }} />
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 2,
                      backgroundColor: "#A7C7E7",
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "#90b8db",
                      },
                    }}
                    onClick={() => handleResgatarVantagem(String(vantagem.id))}
                  >
                    RESGATAR
                  </Button>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>

      <Dialog
        open={!!resgateStatus}
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
            {resgateStatus}
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
