package com.estudantil.moeda.controller;

import com.estudantil.moeda.dto.CreateAlunoDTO;
import com.estudantil.moeda.dto.ResgateVantagemRequestDTO;
import com.estudantil.moeda.dto.ResgateVantagemResponseDTO;
import com.estudantil.moeda.dto.ResponseDTO;
import com.estudantil.moeda.model.Aluno;
import com.estudantil.moeda.service.AlunoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/alunos")
public class AlunoController {

    private final AlunoService alunoService;

    /**
     * Endpoint para criar um novo aluno no sistema.
     * Exemplo de requisição:
     * 
     * **URL**: `POST http://localhost:8080/alunos/criarAluno`
     * 
     * **Body**:
     * ```json
     * {
     * "nome": "João Silva",
     * "email": "joao.silva@exemplo.com",
     * "senha": "senha123",
     * "cpf": "123.456.789-00",
     * "rg": "MG-12.345.678",
     * "endereco": "Rua Exemplo, 123, Belo Horizonte, MG",
     * "instituicaoId":
     * "fe94bfd4-f614-4424-a868-a68b947d0287",
     * "curso": "Ciência da Computação"
     * }
     * ```
     */
    /*@PostMapping("/criarAluno")
    public ResponseEntity<Aluno> criarAluno(@RequestBody CreateAlunoDTO alunoDTO) {
        Aluno aluno = alunoService.criarAluno(alunoDTO);
        return ResponseEntity.ok(aluno);
    }*/

    @GetMapping
    public ResponseEntity<List<Aluno>> listAllStudents() {
        return ResponseEntity.ok(alunoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Aluno> getStudent(@PathVariable UUID id) {
        return ResponseEntity.ok(alunoService.findById(id));
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

    @PostMapping("/resgatarVantagem")
    public ResponseEntity<ResponseDTO> resgateDeVantagem(@RequestBody ResgateVantagemRequestDTO data) {
        return ResponseEntity.ok(alunoService.resgatarVantagem(data));
    }
}