package com.estudantil.moeda.service;

import com.estudantil.moeda.model.Vantagem;
import com.estudantil.moeda.repository.VantagemRepository;
import com.estudantil.moeda.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;


@RequiredArgsConstructor
@Service
public class VantagemService {

    private VantagemRepository vantagemRepository;

    public List<Vantagem> findAll() {
        return vantagemRepository.findAll();
    }

    public Vantagem findById(Long id) {
        return vantagemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vantagem não encontrada!"));
    }

    public Vantagem save(Vantagem vantagem) {
        return vantagemRepository.save(vantagem);
    }

    public Vantagem update(Long id, Vantagem vantagem) {
        if (!vantagemRepository.existsById(id)) {
            throw new ResourceNotFoundException("Vantagem não encontrada!");
        }
        vantagem.setId(id);
        return vantagemRepository.save(vantagem);
    }

    public void delete(Long id) {
        if (!vantagemRepository.existsById(id)) {
            throw new ResourceNotFoundException("Vantagem não encontrada!");
        }
        vantagemRepository.deleteById(id);
    }
} 