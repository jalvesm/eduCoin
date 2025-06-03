package com.estudantil.moeda.controller;

import com.estudantil.moeda.model.Cupom;
import com.estudantil.moeda.service.CupomService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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
    public ResponseEntity<Cupom> createCoupon(@RequestBody Cupom cupom) {
        return ResponseEntity.ok(cupomService.save(cupom));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cupom> updateCoupon(@PathVariable UUID id, @RequestBody Cupom cupom) {
        return ResponseEntity.ok(cupomService.update(id, cupom));
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