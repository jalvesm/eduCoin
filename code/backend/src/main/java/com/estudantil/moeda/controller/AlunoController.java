package com.estudantil.moeda.controller;

import com.estudantil.moeda.dto.ResgateVantagemRequestDTO;
import com.estudantil.moeda.dto.ResponseDTO;
import com.estudantil.moeda.model.Aluno;
import com.estudantil.moeda.service.AlunoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:5173")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/alunos")
public class AlunoController {

    private final AlunoService alunoService;

    @GetMapping
    public ResponseEntity<List<Aluno>> listAllStudents() {
        return ResponseEntity.ok(alunoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Aluno> getStudent(@PathVariable UUID id) {
        return ResponseEntity.ok(alunoService.findById(id));
    }

    @PostMapping
    public ResponseEntity<?> createStudent(@RequestBody @Valid Aluno aluno, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            for (FieldError error : bindingResult.getFieldErrors()) {
                errors.put(error.getField(), error.getDefaultMessage());
            }
            return ResponseEntity.badRequest().body(errors);
        }
        return ResponseEntity.ok(alunoService.save(aluno));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateStudent(@PathVariable UUID id, @RequestBody @Valid Aluno aluno, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            for (FieldError error : bindingResult.getFieldErrors()) {
                errors.put(error.getField(), error.getDefaultMessage());
            }
            return ResponseEntity.badRequest().body(errors);
        }
        return ResponseEntity.ok(alunoService.update(id, aluno));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable UUID id) {
        alunoService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/resgatarVantagem")
    public ResponseEntity<ResponseDTO> resgateDeVantagem(@RequestBody ResgateVantagemRequestDTO data) {
        return ResponseEntity.ok(alunoService.resgatarVantagem(data));
    }
}