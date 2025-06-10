package com.estudantil.moeda.service;

import com.estudantil.moeda.exception.SaldoInsuficienteException;
import com.estudantil.moeda.model.Aluno;
import com.estudantil.moeda.model.Professor;
import com.estudantil.moeda.model.Vantagem;
import org.springframework.stereotype.Service;

@Service
public class ValidacaoService {

    public void validarSaldoProfessor(Professor professor, Double valor) {
        if (professor.getQuantidadeMoedas() < valor) {
            throw new SaldoInsuficienteException("Professor não possui saldo suficiente para realizar a transação");
        }
    }

    public void validarSaldoAluno(Aluno aluno, Vantagem vantagem) {
        if (aluno.getSaldoMoedas() < vantagem.getCustoMoedas()) {
            throw new SaldoInsuficienteException("Aluno não possui saldo suficiente para resgatar esta vantagem");
        }
    }

    public void validarValorTransacao(Double valor) {
        if (valor <= 0) {
            throw new IllegalArgumentException("O valor da transação deve ser maior que zero");
        }
    }

    public void validarSaldoSuficiente(int saldo, int valorNecessario) {
        if (saldo < valorNecessario) {
            throw new IllegalArgumentException("Saldo insuficiente para realizar a operação.");
        }
    }
} 