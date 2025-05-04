package com.estudantil.moeda.service;

import com.estudantil.moeda.model.Instituicao;
import com.estudantil.moeda.repository.InstituicaoRepository;
import com.estudantil.moeda.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;


@RequiredArgsConstructor
@Service
public class InstituicaoService {

    private InstituicaoRepository instituicaoRepository;

    public List<Instituicao> findAll() {
        return instituicaoRepository.findAll();
    }

    public Instituicao findById(UUID id) {
        return instituicaoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Instituição não encontrada"));
    }

    public Instituicao save(Instituicao instituicao) {
        return instituicaoRepository.save(instituicao);
    }

    public Instituicao update(UUID id, Instituicao instituicao) {
        if (!instituicaoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Instituição não encontrada");
        }
        instituicao.setId(id);
        return instituicaoRepository.save(instituicao);
    }

    public void delete(UUID id) {
        if (!instituicaoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Instituição não encontrada");
        }
        instituicaoRepository.deleteById(id);
    }
} 