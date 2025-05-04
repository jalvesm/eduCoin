package com.estudantil.moeda.controller;

import com.estudantil.moeda.model.Vantagem;
import com.estudantil.moeda.service.VantagemService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/vantagens")
public class VantagemController {

    private VantagemService vantagemService;

    @GetMapping
    public ResponseEntity<List<Vantagem>> listAllAdvantages() {
        return ResponseEntity.ok(vantagemService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vantagem> getAdvantage(@PathVariable UUID id) {
        return ResponseEntity.ok(vantagemService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Vantagem> createAdvantage(@RequestBody Vantagem vantagem) {
        return ResponseEntity.ok(vantagemService.save(vantagem));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Vantagem> updateAdvantage(@PathVariable UUID id, @RequestBody Vantagem vantagem) {
        return ResponseEntity.ok(vantagemService.update(id, vantagem));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdvantage(@PathVariable UUID id) {
        vantagemService.delete(id);
        return ResponseEntity.noContent().build();
    }
} 