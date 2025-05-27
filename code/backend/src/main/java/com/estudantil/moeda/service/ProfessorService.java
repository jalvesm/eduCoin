package com.estudantil.moeda.service;

import com.estudantil.moeda.model.Aluno;
import com.estudantil.moeda.model.Professor;
import com.estudantil.moeda.model.Transacao;
import com.estudantil.moeda.repository.AlunoRepository;
import com.estudantil.moeda.repository.ProfessorRepository;
import com.estudantil.moeda.repository.TransacaoRepository;
import com.estudantil.moeda.controller.AtribuirMoedasDTO;
import com.estudantil.moeda.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class ProfessorService {

    @Autowired
    private ProfessorRepository professorRepository;

    @Autowired
    private final AlunoRepository alunoRepository;

    @Autowired
    private final TransacaoRepository transacaoRepository;

    public List<Professor> findAll() {
        return professorRepository.findAll();
    }

    public Professor findById(UUID id) {
        return professorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Professor não encontrado!"));
    }

    public Professor save(Professor professor) {
        return professorRepository.save(professor);
    }

    public Professor update(UUID id, Professor professor) {
        if (!professorRepository.existsById(id)) {
            throw new ResourceNotFoundException("Professor não encontrado!");
        }
        professor.setId(id);
        return professorRepository.save(professor);
    }

    public void delete(UUID id) {
        if (!professorRepository.existsById(id)) {
            throw new ResourceNotFoundException("Professor não encontrado!");
        }
        professorRepository.deleteById(id);
    }

    public void atribuirMoedasParaAluno(UUID professorId, AtribuirMoedasDTO data) {
        Professor professor = professorRepository.findById(professorId)
                .orElseThrow(() -> new ResourceNotFoundException("Professor não encontrado!"));
        Aluno aluno = alunoRepository.findById(data.alunoId())
                .orElseThrow(() -> new ResourceNotFoundException("Aluno não encontrado!"));

        if (data.valor() == null || data.valor() <= 0) {
            throw new IllegalArgumentException("O valor deve ser positivo.");
        }
        if (professor.getQuantidadeMoedas() < data.valor()) {
            throw new IllegalArgumentException("Saldo insuficiente para atribuir moedas.");
        }

        professor.setQuantidadeMoedas(professor.getQuantidadeMoedas() - data.valor());
        aluno.setSaldoMoedas(aluno.getSaldoMoedas() + data.valor());

        professorRepository.save(professor);
        alunoRepository.save(aluno);

        Transacao transacao = new Transacao();
        transacao.setValor(data.valor());
        transacao.setDescricao(data.descricao());
        transacao.setRemetente(professor);
        transacao.setDestinatario(aluno);
        transacao.setDataTransacao(java.time.LocalDateTime.now());

        transacaoRepository.save(transacao);
    }

    public Double buscarSaldoPorId(UUID id) {
        Professor professor = professorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Professor não encontrado!"));
        return professor.getQuantidadeMoedas();
    }
}