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
  TextField,
  TablePagination,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HeaderMenu from "../../../shared/components/HeaderMenu/HeaderMenu";
import { useStudentVantagens } from "../hooks/student";

export default function Coupons() {
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
  const alunoId = usuario?.id || null;

  const { cupons, loading, erro, getCuponsDoAluno } = useStudentVantagens();

  const [filtro, setFiltro] = useState("");
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  useEffect(() => {
    if (alunoId) {
      getCuponsDoAluno(alunoId);
    }
  }, [alunoId, getCuponsDoAluno]);

  const cuponsFiltrados = cupons.filter((cupom) => {
    const texto = filtro.toLowerCase();
    return (
      cupom.codigo.toLowerCase().includes(texto) ||
      cupom.vantagem.titulo.toLowerCase().includes(texto) ||
      new Date(cupom.dataGeracao).toLocaleString().toLowerCase().includes(texto)
    );
  });

  const cuponsPaginados = cuponsFiltrados.slice(
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
          sx={{ fontWeight: "bold", mb: 3, color: "#A7C7E7" }}
        >
          Cupons Disponíveis
        </Typography>

        {!alunoId ? (
          <Alert severity="warning">
            Usuário não autenticado. Faça login para visualizar os cupons.
          </Alert>
        ) : loading ? (
          <CircularProgress />
        ) : erro ? (
          <Alert severity="error">{erro}</Alert>
        ) : (
          <>
            <TextField
              label="Pesquisar cupons"
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
                      <strong>Código</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Vantagem</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Data de Geração</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Ações</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cuponsPaginados.length > 0 ? (
                    cuponsPaginados.map((cupom) => (
                      <TableRow key={cupom.id}>
                        <TableCell>{cupom.codigo}</TableCell>
                        <TableCell>{cupom.vantagem.titulo}</TableCell>
                        <TableCell>
                          {new Date(cupom.dataGeracao).toLocaleString()}
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
                      <TableCell colSpan={4} align="center">
                        Nenhum cupom encontrado.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              component="div"
              count={cuponsFiltrados.length}
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
