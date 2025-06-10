package com.estudantil.moeda.controller;

import com.estudantil.moeda.dto.CreateInstituicaoDTO;
import com.estudantil.moeda.dto.GetAllInstituicoes;
import com.estudantil.moeda.service.InstituicaoService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequiredArgsConstructor
@RequestMapping("/instituicoes")
public class InstituicaoController {

    private final InstituicaoService instituicaoService;

    @GetMapping("/listarTodasAsInstituicoes")
    public ResponseEntity<List<GetAllInstituicoes>> listAllInstitutions() {
        return ResponseEntity.ok(instituicaoService.findAll());
    }

    @PostMapping
    public ResponseEntity<?> createInstitution(@RequestBody @Valid CreateInstituicaoDTO createInstituicaoDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            for (FieldError error : bindingResult.getFieldErrors()) {
                errors.put(error.getField(), error.getDefaultMessage());
            }
            return ResponseEntity.badRequest().body(errors);
        }
        return ResponseEntity.ok(instituicaoService.save(createInstituicaoDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateInstitution(@PathVariable UUID id, @RequestBody @Valid CreateInstituicaoDTO createInstituicaoDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            for (FieldError error : bindingResult.getFieldErrors()) {
                errors.put(error.getField(), error.getDefaultMessage());
            }
            return ResponseEntity.badRequest().body(errors);
        }
        return ResponseEntity.ok(instituicaoService.update(id, createInstituicaoDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInstitution(@PathVariable UUID id) {
        instituicaoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}