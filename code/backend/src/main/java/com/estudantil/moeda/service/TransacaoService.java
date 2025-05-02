package com.estudantil.moeda.service;

import com.estudantil.moeda.model.Transacao;
import com.estudantil.moeda.repository.TransacaoRepository;
import com.estudantil.moeda.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;


@RequiredArgsConstructor
@Service
public class TransacaoService {

    private TransacaoRepository transacaoRepository;

    public List<Transacao> findAll() {
        return transacaoRepository.findAll();
    }

    public Transacao findById(Long id) {
        return transacaoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transação não encontrada!"));
    }

    public Transacao save(Transacao transacao) {
        return transacaoRepository.save(transacao);
    }

    public Transacao update(Long id, Transacao transacao) {
        if (!transacaoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Transação não encontrada!");
        }
        transacao.setId(id);
        return transacaoRepository.save(transacao);
    }

    public void delete(Long id) {
        if (!transacaoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Transação não encontrada!");
        }
        transacaoRepository.deleteById(id);
    }
} 