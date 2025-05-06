import React, { useEffect } from "react";
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
import { useEnterprise } from "../hooks/useEnterprise";

export default function Transactions() {
  const { transacoes, loading, erro, carregarTransacoes } = useEnterprise();

  useEffect(() => {
    carregarTransacoes();
  }, []);

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
                {transacoes.map((transacao) => (
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
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </>
  );
}
