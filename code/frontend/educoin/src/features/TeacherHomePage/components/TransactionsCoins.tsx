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
  CircularProgress,
  Alert,
} from "@mui/material";
import HeaderMenu from "../../../shared/components/HeaderMenu/HeaderMenu";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useTeacher } from "../hooks/teacher";

export default function TransactionsCoins() {
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
  const { transacoes, saldo, loading, erro } = useTeacher(usuario?.id);

  const [filtro, setFiltro] = useState("");
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const transacoesFiltradas = transacoes.filter((tx) => {
    const texto = filtro.toLowerCase();
    return (
      tx.nomeRemetente.toLowerCase().includes(texto) ||
      tx.descricao.toLowerCase().includes(texto) ||
      tx.dataTransacao.toLowerCase().includes(texto)
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
          sx={{ fontWeight: "bold", mb: 1, color: "#90caf9" }}
        >
          Transações de Moedas
        </Typography>

        {erro && <Alert severity="error">{erro}</Alert>}

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

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
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
                  {transacoesPaginadas.map((tx, index) => (
                    <TableRow key={index}>
                      <TableCell>{tx.nomeRemetente}</TableCell>
                      <TableCell
                        sx={{ color: tx.valor >= 1000 ? "green" : "red" }}
                      >
                        {tx.valor >= 1000 ? `+${tx.valor}` : `-${tx.valor}`}
                      </TableCell>
                      <TableCell>{tx.descricao}</TableCell>
                      <TableCell>{tx.dataTransacao}</TableCell>
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
          </>
        )}
      </Box>
    </>
  );
}
