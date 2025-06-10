package com.estudantil.moeda.controller;

import com.estudantil.moeda.dto.CreateVantagemDTO;
import com.estudantil.moeda.dto.ResponseDTO;
import com.estudantil.moeda.exception.ResourceNotFoundException;
import com.estudantil.moeda.model.Vantagem;
import com.estudantil.moeda.service.VantagemService;
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

@RestController
@RequiredArgsConstructor
@RequestMapping("/vantagens")
@CrossOrigin(origins = "http://localhost:5173")
public class VantagemController {

    private final VantagemService vantagemService;

    @GetMapping
    public ResponseEntity<List<Vantagem>> listAllAdvantages() {
        return ResponseEntity.ok(vantagemService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vantagem> getAdvantage(@PathVariable UUID id) {
        return ResponseEntity.ok(vantagemService.findById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateAdvantage(@PathVariable UUID id, @RequestBody @Valid CreateVantagemDTO createVantagemDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            for (FieldError error : bindingResult.getFieldErrors()) {
                errors.put(error.getField(), error.getDefaultMessage());
            }
            return ResponseEntity.badRequest().body(errors);
        }
        return ResponseEntity.ok(vantagemService.update(id, createVantagemDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdvantage(@PathVariable UUID id) {
        vantagemService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping
    public ResponseEntity<?> createAdvantage(@RequestBody @Valid CreateVantagemDTO createVantagemDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            for (FieldError error : bindingResult.getFieldErrors()) {
                errors.put(error.getField(), error.getDefaultMessage());
            }
            return ResponseEntity.badRequest().body(errors);
        }
        try {
            vantagemService.criarVantagem(createVantagemDTO);
            ResponseDTO response = new ResponseDTO("Vantagem criada com sucesso", 201);
            return ResponseEntity.status(201).body(response);
        } catch (ResourceNotFoundException | IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(Map.of("erro", ex.getMessage()));
        }
    }

    @GetMapping("empresa/{empresaId}")
    public ResponseEntity<List<Vantagem>> getAdvantagesByCompany(@PathVariable UUID empresaId) {
        List<Vantagem> vantagens = vantagemService.findByEmpresaId(empresaId);
        return ResponseEntity.ok(vantagens);
    }
}