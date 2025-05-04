package com.estudantil.moeda.service;

import com.estudantil.moeda.model.Instituicao;
import com.estudantil.moeda.repository.InstituicaoRepository;
import com.estudantil.moeda.dto.GetAllInstituicoes;
import com.estudantil.moeda.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;


@RequiredArgsConstructor
@Service
public class InstituicaoService {

    private InstituicaoRepository instituicaoRepository;

    public List<GetAllInstituicoes> findAll() {
        List<Instituicao> instituicoes = instituicaoRepository.findAll();

        return instituicoes.stream()
                .map(instituicao -> new GetAllInstituicoes(instituicao.getId(), instituicao.getNome(), instituicao.getEndereco()))
                .collect(Collectors.toList());
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