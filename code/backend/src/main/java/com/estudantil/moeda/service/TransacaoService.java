package com.estudantil.moeda.service;

import com.estudantil.moeda.model.Transacao;
import com.estudantil.moeda.model.Usuario;
import com.estudantil.moeda.repository.TransacaoRepository;
import com.estudantil.moeda.repository.UsuarioRepository;
import com.estudantil.moeda.dto.ResponseTransactionByEmpresaDTO;
import com.estudantil.moeda.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class TransacaoService {

    @Autowired
    private final UsuarioRepository usuarioRepository;

    @Autowired
    private final TransacaoRepository transacaoRepository;

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

    /*
     * public List<Transacao> buscarTransacoesPorEmpresa(UUID empresaId) {
     * Usuario empresa = usuarioRepository.findById(empresaId)
     * .orElseThrow(() -> new ResourceNotFoundException("Empresa não encontrada"));
     * 
     * return transacaoRepository.findByRemetenteOrDestinatario(empresa, empresa);
     * }
     */

    public List<ResponseTransactionByEmpresaDTO> buscarTransacoesPorEmpresa(UUID empresaId) {
        Usuario empresa = usuarioRepository.findById(empresaId)
                .orElseThrow(() -> new ResourceNotFoundException("Empresa não encontrada"));

        List<Transacao> transacoes = transacaoRepository.findByRemetenteOrDestinatario(empresa, empresa);

        return transacoes.stream()
                .map(transacao -> {
                    Usuario cliente = transacao.getRemetente().equals(empresa)
                            ? transacao.getDestinatario()
                            : transacao.getRemetente();

                    return new ResponseTransactionByEmpresaDTO(
                            transacao.getId(),
                            transacao.getDescricao(),
                            transacao.getValor(),
                            transacao.getDataTransacao(),
                            cliente.getNome());
                })
                .toList();
    }

}