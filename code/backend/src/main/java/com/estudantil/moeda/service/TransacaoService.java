package com.estudantil.moeda.service;

import com.estudantil.moeda.dto.CreateTransacaoDTO;
import com.estudantil.moeda.model.Transacao;
import com.estudantil.moeda.model.Usuario;
import com.estudantil.moeda.repository.TransacaoRepository;
import com.estudantil.moeda.repository.UsuarioRepository;
import com.estudantil.moeda.dto.DetailTransactionData;
import com.estudantil.moeda.dto.ResponseTransactionByEmpresaDTO;
import com.estudantil.moeda.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class TransacaoService {

    private final UsuarioRepository usuarioRepository;
    private final TransacaoRepository transacaoRepository;

    public List<Transacao> findAll() {
        return transacaoRepository.findAll();
    }

    public Transacao findById(UUID id) {
        return transacaoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transação não encontrada!"));
    }

    public Transacao save(CreateTransacaoDTO dto) {
        Usuario aluno = usuarioRepository.findById(dto.getAlunoId())
                .orElseThrow(() -> new ResourceNotFoundException("Aluno não encontrado"));
        
        Usuario professor = usuarioRepository.findById(dto.getProfessorId())
                .orElseThrow(() -> new ResourceNotFoundException("Professor não encontrado"));
        
        Transacao transacao = new Transacao();
        transacao.setTipo(dto.getTipoTransacao());
        transacao.setValor(dto.getValor());
        transacao.setDescricao(dto.getDescricao());
        transacao.setDataTransacao(LocalDateTime.now());
        transacao.setRemetente(professor);
        transacao.setDestinatario(aluno);

        return transacaoRepository.save(transacao);
    }

    public Transacao update(UUID id, CreateTransacaoDTO dto) {
        Transacao existingTransacao = findById(id);
        
        Usuario aluno = usuarioRepository.findById(dto.getAlunoId())
                .orElseThrow(() -> new ResourceNotFoundException("Aluno não encontrado"));
        
        Usuario professor = usuarioRepository.findById(dto.getProfessorId())
                .orElseThrow(() -> new ResourceNotFoundException("Professor não encontrado"));

        existingTransacao.setTipo(dto.getTipoTransacao());
        existingTransacao.setValor(dto.getValor());
        existingTransacao.setDescricao(dto.getDescricao());
        existingTransacao.setRemetente(professor);
        existingTransacao.setDestinatario(aluno);

        return transacaoRepository.save(existingTransacao);
    }

    public void delete(UUID id) {
        if (!transacaoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Transação não encontrada!");
        }
        transacaoRepository.deleteById(id);
    }

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

    public List<Transacao> buscarTransacoesPorProfessor(UUID professorId) {
        return transacaoRepository.findByRemetenteId(professorId);
    }

    public List<Transacao> buscarTransacoesPorAluno(UUID alunoId) {
        return transacaoRepository.findByDestinatarioId(alunoId);
    }

    public List<DetailTransactionData> buscarDetalhesTransacoesPorUsuario(UUID usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado!"));
        return transacaoRepository.findAllByRemetenteIdOrDestinatarioId(usuario.getId())
                .stream()
                .map(t -> new DetailTransactionData(
                        t.getDataTransacao(),
                        t.getDescricao(),
                        t.getRemetente().getNome(),
                        t.getDestinatario().getNome(),
                        t.getValor()))
                .toList();
    }
}
