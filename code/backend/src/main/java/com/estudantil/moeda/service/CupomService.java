package com.estudantil.moeda.service;

import com.estudantil.moeda.model.Cupom;
import com.estudantil.moeda.repository.CupomRepository;
import com.estudantil.moeda.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CupomService {

    @Autowired
    private CupomRepository cupomRepository;

    public List<Cupom> findAll() {
        return cupomRepository.findAll();
    }

    public Cupom findById(UUID id) {
        return cupomRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cupom não encontrado"));
    }

    public Cupom save(Cupom cupom) {
        return cupomRepository.save(cupom);
    }

    public Cupom update(UUID id, Cupom cupom) {
        if (!cupomRepository.existsById(id)) {
            throw new ResourceNotFoundException("Cupom não encontrado");
        }
        cupom.setId(id);
        return cupomRepository.save(cupom);
    }

    public void delete(UUID id) {
        if (!cupomRepository.existsById(id)) {
            throw new ResourceNotFoundException("Cupom não encontrado");
        }
        cupomRepository.deleteById(id);
    }
} 