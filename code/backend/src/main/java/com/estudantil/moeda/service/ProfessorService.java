package com.estudantil.moeda.service;

import com.estudantil.moeda.model.Professor;
import com.estudantil.moeda.repository.ProfessorRepository;
import com.estudantil.moeda.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class ProfessorService {

    private final ProfessorRepository professorRepository;

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
} 