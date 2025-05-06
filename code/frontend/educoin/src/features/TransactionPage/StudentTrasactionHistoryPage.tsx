import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { getTransactionsByUserId } from '../../services/TransactionService';

interface Transacao {
    id: string;
    valor: number;
    descricao: string;
    data: string;
}

const TransactionHistory: React.FC = () => {
    const [transactions, setTransactions] = useState<Transacao[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Recuperando o ID do usuário de algum lugar (exemplo: localStorage)
    const usuarioId = localStorage.getItem('usuarioId');  // Aqui é onde o id do usuário seria recuperado

    useEffect(() => {
        // Verifica se o usuarioId está presente
        if (!usuarioId) {
            setError('Usuário não encontrado');
            setLoading(false);
            return;
        }

        const fetchTransactions = async () => {
            try {
                const data = await getTransactionsByUserId(usuarioId);
                setTransactions(data);
            } catch (error) {
                setError('Erro ao carregar as transações');
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [usuarioId]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Typography variant="h6" color="error">{error}</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 4, fontFamily: 'Poppins, sans-serif', color: '#0056b3', textShadow: '2px 2px 6px rgba(0, 0, 0, 0.1)' }}>
            <Typography variant="h4" fontWeight="bold" mb={4}>
                Histórico de Transações
            </Typography>

            {transactions.length === 0 ? (
                <Typography variant="h6" color="textSecondary">Nenhuma transação encontrada.</Typography>
            ) : (
                <Box>
                    {transactions.map((transacao) => (
                        <Box
                            key={transacao.id}
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderBottom: '1px solid #ddd',
                                padding: '10px 0',
                                marginBottom: 2,
                            }}
                        >
                            <Typography variant="body1" sx={{ flex: 1 }}>{transacao.descricao}</Typography>
                            <Typography variant="body1" sx={{ flex: 1 }}>{new Date(transacao.data).toLocaleDateString()}</Typography>
                            <Typography variant="body1" sx={{ flex: 1 }}>{transacao.valor} moedas</Typography>
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default TransactionHistory;
