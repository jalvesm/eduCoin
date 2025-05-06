import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
} from "@mui/material";
import RedeemIcon from "@mui/icons-material/Redeem";

interface Vantagem {
  id: number;
  nome: string;
  descricao: string;
  custo: number;
}

const StudentAvailableBenefitsPage: React.FC = () => {
  const [vantagens, setVantagens] = useState<Vantagem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/vantagens")
      .then((response) => {
        setVantagens(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar vantagens:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
        <Typography mt={2}>Carregando vantagens...</Typography>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
        Vantagens Disponíveis
      </Typography>

      
      <Box display="flex" flexWrap="wrap" justifyContent="center" gap={4}>
        {vantagens.map((vantagem) => (
          <Box
            key={vantagem.id}
            width={{ xs: "100%", sm: "48%", md: "30%" }}
            p={2}
            boxShadow={5}  
            borderRadius={5}  
          >
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {vantagem.nome}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {vantagem.descricao}
                </Typography>
                <Typography mt={2} fontWeight="bold" color="#007bff">
                  Custo: {vantagem.custo} moedas
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "flex-end", p: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<RedeemIcon />}
                  color="primary"
                  onClick={() => alert("Funcionalidade de resgate futura")}
                >
                  Resgatar
                </Button>
              </CardActions>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default StudentAvailableBenefitsPage;
