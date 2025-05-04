package com.estudantil.moeda.controller;

import com.estudantil.moeda.model.Instituicao;
import com.estudantil.moeda.service.InstituicaoService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/instituicoes")
public class InstituicaoController {

    private final InstituicaoService instituicaoService;

    @GetMapping
    public ResponseEntity<List<Instituicao>> listAllInstitutions() {
        return ResponseEntity.ok(instituicaoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Instituicao> getInstitution(@PathVariable UUID id) {
        return ResponseEntity.ok(instituicaoService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Instituicao> createInstitution(@RequestBody Instituicao instituicao) {
        return ResponseEntity.ok(instituicaoService.save(instituicao));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Instituicao> updateInstitution(@PathVariable UUID id, @RequestBody Instituicao instituicao) {
        return ResponseEntity.ok(instituicaoService.update(id, instituicao));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInstitution(@PathVariable UUID id) {
        instituicaoService.delete(id);
        return ResponseEntity.noContent().build();
    }
} 