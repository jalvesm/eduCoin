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

export default function TransactionsCoins() {
  const transacoes = [
    {
      id: 1,
      remetente: "Sistema",
      quantidade: 1000,
      motivo: "Distribuição de moedas do semestre",
      data: "01/03/2025",
    },
    {
      id: 2,
      remetente: "Prof. Ana Clara",
      quantidade: -50,
      motivo: "Recompensa por participação em aula",
      data: "12/04/2025",
    },
    {
      id: 3,
      remetente: "Prof. Ana Clara",
      quantidade: -30,
      motivo: "Entrega de atividade bônus",
      data: "20/04/2025",
    },
  ];

  return (
    <>
      <HeaderMenu />
      <Box sx={{ p: 4 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", mb: 3, color: "#1976d2" }}
        >
          Transações de Moedas
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Remetente</strong>
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
              {transacoes.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell>{tx.remetente}</TableCell>
                  <TableCell
                    sx={{ color: tx.quantidade > 0 ? "green" : "red" }}
                  >
                    {tx.quantidade > 0 ? `+${tx.quantidade}` : tx.quantidade}
                  </TableCell>
                  <TableCell>{tx.motivo}</TableCell>
                  <TableCell>{tx.data}</TableCell>
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
