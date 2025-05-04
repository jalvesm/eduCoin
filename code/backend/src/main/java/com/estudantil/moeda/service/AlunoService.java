package com.estudantil.moeda.service;

import com.estudantil.moeda.model.Aluno;
import com.estudantil.moeda.repository.AlunoRepository;
import com.estudantil.moeda.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;


@RequiredArgsConstructor
@Service
public class AlunoService {

    private AlunoRepository alunoRepository;

    public List<Aluno> findAll() {
        return alunoRepository.findAll();
    }

    public Aluno findById(UUID id) {
        return alunoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Estudante não encontrado!"));
    }

    public Aluno save(Aluno aluno) {
        return alunoRepository.save(aluno);
    }

    public Aluno update(UUID id, Aluno aluno) {
        if (!alunoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Estudante não encontrado!");
        }
        aluno.setId(id);
        return alunoRepository.save(aluno);
    }

    public void delete(UUID id) {
        if (!alunoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Estudante não encontrado!");
        }
        alunoRepository.deleteById(id);
    }
} 