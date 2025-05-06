import axios from 'axios';

const BASE_URL = 'http://localhost:8080/transacoes'; 


export const getTransactionsByUserId = async (usuarioId: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/usuario/${usuarioId}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar transações:", error);
        throw error;
    }
};


export const getTransactionById = async (id: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar transação:", error);
        throw error;
    }
};
