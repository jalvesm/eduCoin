package com.estudantil.moeda.controller;

import com.estudantil.moeda.model.Aluno;
import com.estudantil.moeda.service.AlunoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/alunos")
public class AlunoController {

    @Autowired
    private AlunoService alunoService;

    @GetMapping
    public ResponseEntity<List<Aluno>> listAllStudents() {
        return ResponseEntity.ok(alunoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Aluno> getStudent(@PathVariable UUID id) {
        return ResponseEntity.ok(alunoService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Aluno> createStudent(@RequestBody Aluno aluno) {
        return ResponseEntity.ok(alunoService.save(aluno));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Aluno> updateStudent(@PathVariable UUID id, @RequestBody Aluno aluno) {
        return ResponseEntity.ok(alunoService.update(id, aluno));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable UUID id) {
        alunoService.delete(id);
        return ResponseEntity.noContent().build();
    }
} 