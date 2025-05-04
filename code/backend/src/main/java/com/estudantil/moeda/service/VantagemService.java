package com.estudantil.moeda.service;

import com.estudantil.moeda.model.Empresa;
import com.estudantil.moeda.model.Vantagem;
import com.estudantil.moeda.repository.EmpresaRepository;
import com.estudantil.moeda.repository.VantagemRepository;
import com.estudantil.moeda.dto.VantagemRequest;
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

    public Vantagem save(Vantagem vantagem) {
        return vantagemRepository.save(vantagem);
    }

    public Vantagem update(UUID id, Vantagem vantagem) {
        if (!vantagemRepository.existsById(id)) {
            throw new ResourceNotFoundException("Vantagem não encontrada!");
        }
        vantagem.setId(id);
        return vantagemRepository.save(vantagem);
    }

    public void delete(UUID id) {
        if (!vantagemRepository.existsById(id)) {
            throw new ResourceNotFoundException("Vantagem não encontrada!");
        }
        vantagemRepository.deleteById(id);
    }

    public Vantagem criarVantagem(VantagemRequest request) {
        Empresa empresa = empresaRepository.findById(request.getEmpresaId())
                .orElseThrow(() -> new RuntimeException("Empresa não encontrada"));

        boolean tituloDuplicado = vantagemRepository.existsByTituloAndEmpresaId(request.getTitulo(),
                request.getEmpresaId());
        if (tituloDuplicado) {
            throw new RuntimeException("Já existe uma vantagem com esse título para a empresa informada");
        }

        Vantagem vantagem = new Vantagem();
        vantagem.setTitulo(request.getTitulo());
        vantagem.setDescricao(request.getDescricao());
        vantagem.setImagem(request.getImagem());
        vantagem.setCustoMoedas(request.getCustoMoedas());
        vantagem.setEmpresa(empresa);

        return vantagemRepository.save(vantagem);
    }
}