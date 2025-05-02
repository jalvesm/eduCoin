package com.estudantil.moeda.controller;

import com.estudantil.moeda.model.Transacao;
import com.estudantil.moeda.service.TransacaoService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/transacoes")
public class TransacaoController {

    private TransacaoService transacaoService;

    @GetMapping
    public ResponseEntity<List<Transacao>> listAllTransactions() {
        return ResponseEntity.ok(transacaoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Transacao> getTransaction(@PathVariable Long id) {
        return ResponseEntity.ok(transacaoService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Transacao> createTransaction(@RequestBody Transacao transacao) {
        return ResponseEntity.ok(transacaoService.save(transacao));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Transacao> updateTransaction(@PathVariable Long id, @RequestBody Transacao transacao) {
        return ResponseEntity.ok(transacaoService.update(id, transacao));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTransaction(@PathVariable Long id) {
        transacaoService.delete(id);
        return ResponseEntity.noContent().build();
    }
} 