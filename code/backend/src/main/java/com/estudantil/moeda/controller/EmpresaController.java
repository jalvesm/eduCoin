package com.estudantil.moeda.controller;

import com.estudantil.moeda.model.Empresa;
import com.estudantil.moeda.service.EmpresaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/empresas")
public class EmpresaController {

    @Autowired
    private EmpresaService empresaService;

    @GetMapping
    public ResponseEntity<List<Empresa>> listAllCompanies() {
        return ResponseEntity.ok(empresaService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Empresa> getCompany(@PathVariable UUID id) {
        return ResponseEntity.ok(empresaService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Empresa> createCompany(@RequestBody Empresa empresa) {
        return ResponseEntity.ok(empresaService.save(empresa));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Empresa> updateCompany(@PathVariable UUID id, @RequestBody Empresa empresa) {
        return ResponseEntity.ok(empresaService.update(id, empresa));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCompany(@PathVariable UUID id) {
        empresaService.delete(id);
        return ResponseEntity.noContent().build();
    }
} 