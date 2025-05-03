package com.estudantil.moeda.service;

import com.estudantil.moeda.model.Empresa;
import com.estudantil.moeda.model.enums.TipoUsuario;
import com.estudantil.moeda.repository.EmpresaRepository;
import com.estudantil.moeda.repository.UsuarioRepository;
import com.estudantil.moeda.dto.CreateEmpresaDTO;
import com.estudantil.moeda.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class EmpresaService {

    @Autowired
    private EmpresaRepository empresaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Empresa> findAll() {
        return empresaRepository.findAll();
    }

    public Empresa findById(UUID id) {
        return empresaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Empresa não encontrada"));
    }

        public Empresa criarEmpresa(CreateEmpresaDTO empresaDTO) {
        if (usuarioRepository.existsByEmail(empresaDTO.email())) {
            throw new IllegalArgumentException("O e-mail informado já está cadastrado.");
        }

        if (empresaRepository.existsByCnpj(empresaDTO.cnpj())) {
            throw new IllegalArgumentException("O CNPJ informado já está cadastrado.");
        }

        Empresa empresa = Empresa.builder()
                .nome(empresaDTO.nome())
                .email(empresaDTO.email())
                .senha(empresaDTO.senha())
                .tipo(TipoUsuario.EMPRESA)
                .cnpj(empresaDTO.cnpj())
                .build();

        return empresaRepository.save(empresa);
    }

/*     public Empresa save(Empresa empresa) {
        return empresaRepository.save(empresa);
    } */

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