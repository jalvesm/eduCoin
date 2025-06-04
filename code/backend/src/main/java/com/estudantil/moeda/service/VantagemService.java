package com.estudantil.moeda.service;

import com.estudantil.moeda.dto.CreateVantagemDTO;
import com.estudantil.moeda.model.Empresa;
import com.estudantil.moeda.model.Vantagem;
import com.estudantil.moeda.repository.EmpresaRepository;
import com.estudantil.moeda.repository.VantagemRepository;
import com.estudantil.moeda.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class VantagemService {

    private final VantagemRepository vantagemRepository;
    private final EmpresaRepository empresaRepository;

    public List<Vantagem> findAll() {
        return vantagemRepository.findAll();
    }

    public Vantagem findById(UUID id) {
        return vantagemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vantagem não encontrada!"));
    }

    public Vantagem criarVantagem(CreateVantagemDTO dto) {
        Empresa empresa = empresaRepository.findById(dto.getEmpresaId())
                .orElseThrow(() -> new ResourceNotFoundException("Empresa não encontrada"));

        boolean tituloDuplicado = vantagemRepository.existsByTituloAndEmpresaId(dto.getNome(),
                dto.getEmpresaId());
        if (tituloDuplicado) {
            throw new RuntimeException("Já existe uma vantagem com esse título para a empresa informada");
        }

        Vantagem vantagem = new Vantagem();
        vantagem.setTitulo(dto.getNome());
        vantagem.setDescricao(dto.getDescricao());
        vantagem.setImagem(dto.getImagem());
        vantagem.setCustoMoedas(dto.getValor().intValue());
        vantagem.setEmpresa(empresa);

        return vantagemRepository.save(vantagem);
    }

    public Vantagem update(UUID id, CreateVantagemDTO dto) {
        Vantagem existingVantagem = findById(id);
        
        Empresa empresa = empresaRepository.findById(dto.getEmpresaId())
                .orElseThrow(() -> new ResourceNotFoundException("Empresa não encontrada"));

        boolean tituloDuplicado = vantagemRepository.existsByTituloAndEmpresaId(dto.getNome(),
                dto.getEmpresaId());
        if (tituloDuplicado && !existingVantagem.getTitulo().equals(dto.getNome())) {
            throw new RuntimeException("Já existe uma vantagem com esse título para a empresa informada");
        }

        existingVantagem.setTitulo(dto.getNome());
        existingVantagem.setDescricao(dto.getDescricao());
        existingVantagem.setImagem(dto.getImagem());
        existingVantagem.setCustoMoedas(dto.getValor().intValue());
        existingVantagem.setEmpresa(empresa);

        return vantagemRepository.save(existingVantagem);
    }

    public void delete(UUID id) {
        if (!vantagemRepository.existsById(id)) {
            throw new ResourceNotFoundException("Vantagem não encontrada!");
        }
        vantagemRepository.deleteById(id);
    }

    public List<Vantagem> findByEmpresaId(UUID empresaId) {
        return vantagemRepository.findByEmpresaId(empresaId);
    }
}