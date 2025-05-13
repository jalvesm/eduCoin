package com.estudantil.moeda.controller;

import com.estudantil.moeda.dto.ResponseTransactionByEmpresaDTO;
import com.estudantil.moeda.model.Transacao;
import com.estudantil.moeda.service.TransacaoService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequiredArgsConstructor
@RequestMapping("/transacoes")
public class TransacaoController {

    private final TransacaoService transacaoService;

    @GetMapping
    public ResponseEntity<List<Transacao>> listAllTransactions() {
        return ResponseEntity.ok(transacaoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Transacao> getTransaction(@PathVariable UUID id) {
        return ResponseEntity.ok(transacaoService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Transacao> createTransaction(@RequestBody Transacao transacao) {
        return ResponseEntity.ok(transacaoService.save(transacao));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Transacao> updateTransaction(@PathVariable UUID id, @RequestBody Transacao transacao) {
        return ResponseEntity.ok(transacaoService.update(id, transacao));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTransaction(@PathVariable UUID id) {
        transacaoService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/empresa/{empresaId}")
    public ResponseEntity<List<ResponseTransactionByEmpresaDTO>> getTransacoesPorEmpresa(@PathVariable UUID empresaId) {
        List<ResponseTransactionByEmpresaDTO> transacoes = transacaoService.buscarTransacoesPorEmpresa(empresaId);
        return ResponseEntity.ok(transacoes);
    }

    @GetMapping("/professor/{professorId}")
    public ResponseEntity<List<Transacao>> getTransacoesProfessor(@PathVariable UUID professorId) {
        return ResponseEntity.ok(transacaoService.buscarTransacoesPorProfessor(professorId));
    }

    @GetMapping("/aluno/{alunoId}")
    public ResponseEntity<List<Transacao>> getTransacoesAluno(@PathVariable UUID alunoId) {
        return ResponseEntity.ok(transacaoService.buscarTransacoesPorAluno(alunoId));
    }
}