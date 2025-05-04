package com.estudantil.moeda.service;

import com.estudantil.moeda.model.Empresa;
import com.estudantil.moeda.repository.EmpresaRepository;
import com.estudantil.moeda.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;


@RequiredArgsConstructor
@Service
public class EmpresaService {

    private EmpresaRepository empresaRepository;

    public List<Empresa> findAll() {
        return empresaRepository.findAll();
    }

    public Empresa findById(UUID id) {
        return empresaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Empresa não encontrada"));
    }

    public Empresa save(Empresa empresa) {
        return empresaRepository.save(empresa);
    }

    public Empresa update(UUID id, Empresa empresa) {
        if (!empresaRepository.existsById(id)) {
            throw new ResourceNotFoundException("Empresa não encontrada");
        }
        empresa.setId(id);
        return empresaRepository.save(empresa);
    }

    public void delete(UUID id) {
        if (!empresaRepository.existsById(id)) {
            throw new ResourceNotFoundException("Empresa não encontrada");
        }
        empresaRepository.deleteById(id);
    }
} 