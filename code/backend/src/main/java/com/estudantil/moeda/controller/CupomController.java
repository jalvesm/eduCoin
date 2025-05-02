package com.estudantil.moeda.controller;

import com.estudantil.moeda.model.Cupom;
import com.estudantil.moeda.service.CupomService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/cupons")
public class CupomController {

    private CupomService cupomService;

    @GetMapping
    public ResponseEntity<List<Cupom>> listAllCoupons() {
        return ResponseEntity.ok(cupomService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cupom> getCoupon(@PathVariable Long id) {
        return ResponseEntity.ok(cupomService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Cupom> createCoupon(@RequestBody Cupom cupom) {
        return ResponseEntity.ok(cupomService.save(cupom));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cupom> updateCoupon(@PathVariable Long id, @RequestBody Cupom cupom) {
        return ResponseEntity.ok(cupomService.update(id, cupom));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCoupon(@PathVariable Long id) {
        cupomService.delete(id);
        return ResponseEntity.noContent().build();
    }
} 