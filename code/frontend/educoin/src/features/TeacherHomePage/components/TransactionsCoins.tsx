import React, { useState } from "react";
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
  TextField,
  TablePagination,
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

  const [filtro, setFiltro] = useState("");
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const transacoesFiltradas = transacoes.filter((tx) => {
    const texto = filtro.toLowerCase();
    return (
      tx.remetente.toLowerCase().includes(texto) ||
      tx.motivo.toLowerCase().includes(texto) ||
      tx.data.toLowerCase().includes(texto)
    );
  });

  const transacoesPaginadas = transacoesFiltradas.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <>
      <HeaderMenu />
      <Box sx={{ p: 4 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", mb: 3, color: "#90caf9" }}
        >
          Transações de Moedas
        </Typography>

        <TextField
          label="Pesquisar"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          value={filtro}
          onChange={(e) => {
            setFiltro(e.target.value);
            setPage(0);
          }}
        />

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
              {transacoesPaginadas.map((tx) => (
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

              {transacoesPaginadas.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    Nenhuma transação encontrada.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={transacoesFiltradas.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[]}
        />
      </Box>
    </>
  );
}
