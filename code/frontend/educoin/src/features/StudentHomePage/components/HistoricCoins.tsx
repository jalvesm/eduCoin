import React from "react";
import {
  Box,
  IconButton,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
} from "@mui/material";
import HeaderMenu from "../../../shared/components/HeaderMenu/HeaderMenu";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function HistoricCoins() {
  const historicoMoedas = [
    {
      id: 1,
      professor: "Prof. Ana Clara",
      quantidade: 50,
      motivo: "Participação em aula extra",
      data: "19/05/2025",
    },
    {
      id: 2,
      professor: "Prof. Ricardo Lima",
      quantidade: 30,
      motivo: "Entrega de atividade no prazo",
      data: "18/05/2025",
    },
    {
      id: 3,
      professor: "Prof. Marta Souza",
      quantidade: 20,
      motivo: "Bom desempenho em avaliação",
      data: "20/05/2025",
    },
  ];

  return (
    <>
      <HeaderMenu />

      <Box sx={{ p: 4 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", mb: 3, color: "#A7C7E7" }}
        >
          Histórico de Moedas Recebidas
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Professor</strong>
                </TableCell>
                <TableCell>
                  <strong>Quantidade</strong>
                </TableCell>
                <TableCell>
                  <strong>Motivo</strong>
                </TableCell>
                <TableCell>
                  <strong>Data</strong>
                </TableCell>
                <TableCell>
                  <strong>Ações</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {historicoMoedas.map((registro) => (
                <TableRow key={registro.id}>
                  <TableCell>{registro.professor}</TableCell>
                  <TableCell>{registro.quantidade}</TableCell>
                  <TableCell>{registro.motivo}</TableCell>
                  <TableCell>{registro.data}</TableCell>
                  <TableCell>
                    <IconButton disabled>
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
