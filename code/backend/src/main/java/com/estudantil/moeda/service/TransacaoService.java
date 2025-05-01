package com.estudantil.moeda.service;

import com.estudantil.moeda.model.Transacao;
import com.estudantil.moeda.repository.TransacaoRepository;
import com.estudantil.moeda.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class TransacaoService {

    @Autowired
    private TransacaoRepository transacaoRepository;

    public List<Transacao> findAll() {
        return transacaoRepository.findAll();
    }

    public Transacao findById(UUID id) {
        return transacaoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transação não encontrada!"));
    }

    public Transacao save(Transacao transacao) {
        return transacaoRepository.save(transacao);
    }

    public Transacao update(UUID id, Transacao transacao) {
        if (!transacaoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Transação não encontrada!");
        }
        transacao.setId(id);
        return transacaoRepository.save(transacao);
    }

    public void delete(UUID id) {
        if (!transacaoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Transação não encontrada!");
        }
        transacaoRepository.deleteById(id);
    }
} 