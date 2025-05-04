package com.estudantil.moeda.controller;

import com.estudantil.moeda.dto.ResponseDTO;
import com.estudantil.moeda.dto.VantagemRequest;
import com.estudantil.moeda.model.Vantagem;
import com.estudantil.moeda.service.VantagemService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequiredArgsConstructor
@RequestMapping("/vantagens")
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
    public ResponseEntity<Vantagem> updateAdvantage(@PathVariable UUID id, @RequestBody Vantagem vantagem) {
        return ResponseEntity.ok(vantagemService.update(id, vantagem));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdvantage(@PathVariable UUID id) {
        vantagemService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping
    public ResponseEntity<ResponseDTO> createAdvantage(@RequestBody VantagemRequest request) {
        vantagemService.criarVantagem(request);

        ResponseDTO response = new ResponseDTO("Vantagem criada com sucesso", 201);
        return ResponseEntity.status(201).body(response);
    }
}