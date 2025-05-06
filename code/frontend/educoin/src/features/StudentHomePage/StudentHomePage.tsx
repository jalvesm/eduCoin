import React from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";
import HeaderMenu from "../../shared/components/HeaderMenu/HeaderMenu";
import { useStudentVantagens } from "./hooks/student";

export default function StudentHomePage() {
  const { vantagens, loading, erro } = useStudentVantagens();

  const handleResgatarVantagem = (vantagemId: number) => {
    console.log(`Resgatar vantagem com ID: ${vantagemId}`);
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
            gap: 3,
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
                  <Box sx={{ flexGrow: 1 }} />{" "}
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
                    onClick={() => handleResgatarVantagem(vantagem.id)}
                  >
                    RESGATAR
                  </Button>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}
