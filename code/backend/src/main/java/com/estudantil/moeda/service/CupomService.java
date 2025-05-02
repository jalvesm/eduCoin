package com.estudantil.moeda.service;

import com.estudantil.moeda.model.Cupom;
import com.estudantil.moeda.repository.CupomRepository;
import com.estudantil.moeda.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@RequiredArgsConstructor
@Service
public class CupomService {

    private CupomRepository cupomRepository;

    public List<Cupom> findAll() {
        return cupomRepository.findAll();
    }

    public Cupom findById(Long id) {
        return cupomRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cupom não encontrado"));
    }

    public Cupom save(Cupom cupom) {
        return cupomRepository.save(cupom);
    }

    public Cupom update(Long id, Cupom cupom) {
        if (!cupomRepository.existsById(id)) {
            throw new ResourceNotFoundException("Cupom não encontrado");
        }
        cupom.setId(id);
        return cupomRepository.save(cupom);
    }

    public void delete(Long id) {
        if (!cupomRepository.existsById(id)) {
            throw new ResourceNotFoundException("Cupom não encontrado");
        }
        cupomRepository.deleteById(id);
    }
} 