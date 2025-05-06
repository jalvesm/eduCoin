package com.estudantil.moeda.service;
import com.estudantil.moeda.model.Usuario;
import com.estudantil.moeda.repository.UsuarioRepository;
import com.estudantil.moeda.model.Transacao;
import com.estudantil.moeda.repository.TransacaoRepository;
import com.estudantil.moeda.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class TransacaoService {

    private final TransacaoRepository transacaoRepository;
    private final UsuarioRepository usuarioRepository;  


    public List<Transacao> findAll() {
        return transacaoRepository.findAll();
    }

    public Transacao findById(UUID id) {
        return transacaoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transação não encontrada!"));
    }

    public List<Transacao> findByUsuarioId(UUID usuarioId) {
        return transacaoRepository.findByUsuarioId(usuarioId);
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

    public Transacao realizarTroca(UUID usuarioId, Integer custoMoedas) {
    
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));
    
        
        if (usuario.getMoedas() < custoMoedas) {
            throw new IllegalArgumentException("Moedas insuficientes para a troca");
        }
    
        
        usuario.setMoedas(usuario.getMoedas() - custoMoedas);
        usuarioRepository.save(usuario); 
    
        
        Transacao transacao = new Transacao();
        transacao.setUsuario(usuario); 
        transacao.setCustoMoedas(custoMoedas);
        transacao.setTipoTransacao("TROCA"); 
    
        
        return transacaoRepository.save(transacao);
    }
} 