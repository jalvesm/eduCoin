package com.estudantil.moeda.controller;

import com.estudantil.moeda.dto.CreateCupomDTO;
import com.estudantil.moeda.model.Cupom;
import com.estudantil.moeda.service.CupomService;
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
@RequestMapping("/cupons")
public class CupomController {

    private final CupomService cupomService;

    @GetMapping
    public ResponseEntity<List<Cupom>> listAllCoupons() {
        return ResponseEntity.ok(cupomService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cupom> getCoupon(@PathVariable UUID id) {
        return ResponseEntity.ok(cupomService.findById(id));
    }

    @PostMapping
    public ResponseEntity<?> createCoupon(@RequestBody @Valid CreateCupomDTO createCupomDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            for (FieldError error : bindingResult.getFieldErrors()) {
                errors.put(error.getField(), error.getDefaultMessage());
            }
            return ResponseEntity.badRequest().body(errors);
        }
        return ResponseEntity.ok(cupomService.save(createCupomDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCoupon(@PathVariable UUID id, @RequestBody @Valid CreateCupomDTO createCupomDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            for (FieldError error : bindingResult.getFieldErrors()) {
                errors.put(error.getField(), error.getDefaultMessage());
            }
            return ResponseEntity.badRequest().body(errors);
        }
        return ResponseEntity.ok(cupomService.update(id, createCupomDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCoupon(@PathVariable UUID id) {
        cupomService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/cuponsDoAluno")
    public ResponseEntity<List<Cupom>> listAllCouponsFromAluno(@RequestParam UUID alunoId) {
        return ResponseEntity.ok(cupomService.findAllFromAluno(alunoId));
    }
}