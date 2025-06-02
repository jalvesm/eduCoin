import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  IconButton,
  CircularProgress,
  Alert,
  TablePagination,
} from "@mui/material";
import { TextField } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HeaderMenu from "../../../shared/components/HeaderMenu/HeaderMenu";
import { useEnterprise } from "../hooks/useEnterprise";

export default function Transactions() {
  const { transacoes, loading, erro, carregarTransacoes } = useEnterprise();

  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    carregarTransacoes();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const transacoesFiltradas = transacoes.filter((transacao) => {
    const texto = filtro.toLowerCase();
    return (
      transacao.descricao.toLowerCase().includes(texto) ||
      transacao.nomeCliente.toLowerCase().includes(texto) ||
      transacao.data.toLowerCase().includes(texto)
    );
  });

  const transacoesPaginadas = transacoesFiltradas.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <HeaderMenu />

      <Box sx={{ p: 4 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", mb: 3, color: "#A7C7E7" }}
        >
          Transações
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

        {loading ? (
          <CircularProgress />
        ) : erro ? (
          <Alert severity="error">{erro}</Alert>
        ) : (
          <Paper>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>Descrição</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Valor (R$)</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Cliente</strong>
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
                  {transacoesPaginadas.map((transacao) => (
                    <TableRow key={transacao.id}>
                      <TableCell>{transacao.descricao}</TableCell>
                      <TableCell>R$ {transacao.valor.toFixed(2)}</TableCell>
                      <TableCell>{transacao.nomeCliente}</TableCell>
                      <TableCell>{transacao.data.split(" ")[0]}</TableCell>
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
          </Paper>
        )}
      </Box>
    </>
  );
}
