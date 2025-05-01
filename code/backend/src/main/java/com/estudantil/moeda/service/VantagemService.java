package com.estudantil.moeda.service;

import com.estudantil.moeda.model.Vantagem;
import com.estudantil.moeda.repository.VantagemRepository;
import com.estudantil.moeda.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class VantagemService {

    @Autowired
    private VantagemRepository vantagemRepository;

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
} 