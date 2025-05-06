package com.estudantil.moeda.service;

import com.estudantil.moeda.model.Aluno;
import com.estudantil.moeda.model.Cupom;
import com.estudantil.moeda.model.Usuario;
import com.estudantil.moeda.repository.AlunoRepository;
import com.estudantil.moeda.repository.CupomRepository;
import com.estudantil.moeda.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;


@RequiredArgsConstructor
@Service
public class CupomService {

    @Autowired
    private final AlunoRepository alunoRepository;
    private final CupomRepository cupomRepository;

    public List<Cupom> findAll() {
        return cupomRepository.findAll();
    }

    public Cupom findById(UUID id) {
        return cupomRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cupom não encontrado"));
    }

    public Cupom save(Cupom cupom) {
        return cupomRepository.save(cupom);
    }

    public Cupom update(UUID id, Cupom cupom) {
        if (!cupomRepository.existsById(id)) {
            throw new ResourceNotFoundException("Cupom não encontrado");
        }
        cupom.setId(id);
        return cupomRepository.save(cupom);
    }

    public void delete(UUID id) {
        if (!cupomRepository.existsById(id)) {
            throw new ResourceNotFoundException("Cupom não encontrado");
        }
        cupomRepository.deleteById(id);
    }

    public List<Cupom> findAllFromAluno(UUID alunoId) {
        Aluno aluno = alunoRepository.findById(alunoId)
                .orElseThrow(() -> new IllegalArgumentException("Aluno não encontrado."));
        return cupomRepository.findAllByAluno(aluno);
    }
    
}