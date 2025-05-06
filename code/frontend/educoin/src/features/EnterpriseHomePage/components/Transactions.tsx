import React from "react";
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
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HeaderMenu from "../../../shared/components/HeaderMenu/HeaderMenu";

const transacoes = [
  {
    id: 1,
    valor: 100,
    descricao: "Compra de produto X",
    remetente: "João",
    destinatario: "Empresa Y",
    data: "2025-05-01",
  },
  {
    id: 2,
    valor: 250,
    descricao: "Serviço prestado",
    remetente: "Maria",
    destinatario: "Empresa Z",
    data: "2025-05-03",
  },
];

export default function Transactions() {
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
                  <TableCell>{transacao.remetente}</TableCell>
                  <TableCell>
                    {new Date(transacao.data).toLocaleDateString("pt-BR")}
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
      </Box>
    </>
  );
}
