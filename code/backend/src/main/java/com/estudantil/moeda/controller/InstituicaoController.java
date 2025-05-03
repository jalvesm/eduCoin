package com.estudantil.moeda.controller;

import com.estudantil.moeda.model.Instituicao;
import com.estudantil.moeda.service.InstituicaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/instituicoes")
public class InstituicaoController {

    @Autowired
    private InstituicaoService instituicaoService;

    @GetMapping
    public ResponseEntity<List<Instituicao>> listAllInstitutions() {
        return ResponseEntity.ok(instituicaoService.findAll());
    }

/*     @GetMapping("/buscarInstituicao")
    public ResponseEntity<Instituicao> getInstitution() {
        return ResponseEntity.ok(instituicaoService.findById(id));
    } */

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