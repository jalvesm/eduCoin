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
import { useNavigate } from "react-router-dom"; // Para redirecionar caso o aluno não esteja logado

export default function Coupons() {
  const [cupons, setCupons] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);
  const navigate = useNavigate(); // Instanciando o hook de navegação

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
                {cupons.map((cupom) => (
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
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </>
  );
}
