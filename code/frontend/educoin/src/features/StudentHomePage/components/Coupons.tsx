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
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HeaderMenu from "../../../shared/components/HeaderMenu/HeaderMenu";
import { useNavigate } from "react-router-dom";
import { TextField, TablePagination } from "@mui/material";

export default function Coupons() {
  const [cupons, setCupons] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);
  const [filtro, setFiltro] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const rowsPerPage = 10;

  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
  const alunoId = usuario.id;

  useEffect(() => {
    if (!alunoId) {
      navigate("/login");
      return;
    }

    const fetchCupons = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/cupons/cuponsDoAluno?alunoId=${alunoId}`
        );
        const data = await response.json();
        setCupons(data);
      } catch (error) {
        setErro("Ocorreu um erro ao carregar os cupons.");
      } finally {
        setLoading(false);
      }
    };

    fetchCupons();
  }, [alunoId, navigate]);

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

        {loading ? (
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
                setPage(0); // resetar para a primeira página
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
