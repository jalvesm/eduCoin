package com.estudantil.moeda.controller;

import com.estudantil.moeda.dto.AtribuirMoedasDTO;
import com.estudantil.moeda.model.Professor;
import com.estudantil.moeda.service.ProfessorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/professores")
@CrossOrigin(origins = "http://localhost:5173")
public class ProfessorController {

    private final ProfessorService professorService;

    @GetMapping
    public ResponseEntity<List<Professor>> listAllProfessors() {
        return ResponseEntity.ok(professorService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Professor> getProfessor(@PathVariable UUID id) {
        return ResponseEntity.ok(professorService.findById(id));
    }

    @PostMapping
    public ResponseEntity<?> createProfessor(@RequestBody @Valid Professor professor, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            for (FieldError error : bindingResult.getFieldErrors()) {
                errors.put(error.getField(), error.getDefaultMessage());
            }
            return ResponseEntity.badRequest().body(errors);
        }
        return ResponseEntity.ok(professorService.save(professor));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProfessor(@PathVariable UUID id, @RequestBody @Valid Professor professor,
            BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            for (FieldError error : bindingResult.getFieldErrors()) {
                errors.put(error.getField(), error.getDefaultMessage());
            }
            return ResponseEntity.badRequest().body(errors);
        }
        return ResponseEntity.ok(professorService.update(id, professor));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProfessor(@PathVariable UUID id) {
        professorService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{professorId}/atribuir-moedas")
    public ResponseEntity<Void> atribuirMoedasParaAluno(
            @PathVariable UUID professorId,
            @RequestBody @Validated AtribuirMoedasDTO data) {
        professorService.atribuirMoedasParaAluno(professorId, data);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/saldo/{id}")
    public ResponseEntity<Double> getSaldoAluno(@PathVariable UUID id) {
        Double saldo = professorService.buscarSaldoPorId(id);
        return ResponseEntity.ok(saldo);
    }
}