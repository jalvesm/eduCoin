import React, { useEffect, useState } from "react";
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
import { useStudentVantagens } from "../hooks/student";

export default function HistoricCoins() {
  const { transacoes, loading, erro, getTransacoesDoAluno } =
    useStudentVantagens();

  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
  const idAluno = usuario?.id || "";

  const [filtro, setFiltro] = useState("");
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  useEffect(() => {
    if (idAluno) {
      getTransacoesDoAluno(idAluno);
    }
  }, [idAluno, getTransacoesDoAluno]);

  const historicoFiltrado = transacoes.filter((registro) => {
    const texto = filtro.toLowerCase();
    return (
      registro.nomeRemetente?.toLowerCase().includes(texto) ||
      registro.nomeDestinatario?.toLowerCase().includes(texto) ||
      registro.descricao?.toLowerCase().includes(texto) ||
      new Date(registro.dataTransacao)
        .toLocaleDateString("pt-BR")
        .includes(texto)
    );
  });

  const historicoPaginado = historicoFiltrado.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleFiltroChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiltro(event.target.value);
    setPage(0);
  };

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

        <TextField
          label="Pesquisar"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          value={filtro}
          onChange={handleFiltroChange}
          disabled={loading}
        />

        {erro && (
          <Typography color="error" sx={{ mb: 2 }}>
            {erro}
          </Typography>
        )}

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Remetente</strong>
                </TableCell>
                <TableCell>
                  <strong>Destinatário</strong>
                </TableCell>
                <TableCell>
                  <strong>Descrição</strong>
                </TableCell>
                <TableCell>
                  <strong>Valor</strong>
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
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Carregando...
                  </TableCell>
                </TableRow>
              ) : historicoPaginado.length > 0 ? (
                historicoPaginado.map((registro, index) => (
                  <TableRow key={index}>
                    <TableCell>{registro.nomeRemetente}</TableCell>
                    <TableCell>{registro.nomeDestinatario}</TableCell>
                    <TableCell>{registro.descricao}</TableCell>
                    <TableCell>{registro.valor.toFixed(2)}</TableCell>
                    <TableCell>
                      {new Date(registro.dataTransacao).toLocaleDateString(
                        "pt-BR"
                      )}
                    </TableCell>
                    <TableCell>
                      <IconButton disabled>
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Nenhum registro encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={historicoFiltrado.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[]}
        />
      </Box>
    </>
  );
}
