package com.estudantil.moeda.controller;

import com.estudantil.moeda.model.*;
import com.estudantil.moeda.service.*;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;
    private final AlunoService alunoService;
    private final ProfessorService professorService;
    private final EmpresaService empresaService;

    @GetMapping
    public ResponseEntity<List<Usuario>> listAllUsers() {
        return ResponseEntity.ok(usuarioService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> getUser(@PathVariable UUID id) {
        return ResponseEntity.ok(usuarioService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Usuario> createUser(@RequestBody Usuario usuario) {

        Usuario savedUsuario = usuarioService.save(usuario);
        
        switch (usuario.getTipoUsuario()) {
            case ALUNO:
                Aluno aluno = new Aluno();
                aluno.setId(savedUsuario.getId());
                aluno.setNome(savedUsuario.getNome());
                aluno.setEmail(savedUsuario.getEmail());
                aluno.setSenha(savedUsuario.getSenha());
                aluno.setTipoUsuario(savedUsuario.getTipoUsuario());
                return ResponseEntity.ok(alunoService.save(aluno));
                
            case PROFESSOR:
                Professor professor = new Professor();
                professor.setId(savedUsuario.getId());
                professor.setNome(savedUsuario.getNome());
                professor.setEmail(savedUsuario.getEmail());
                professor.setSenha(savedUsuario.getSenha());
                professor.setTipoUsuario(savedUsuario.getTipoUsuario());
                return ResponseEntity.ok(professorService.save(professor));
                
            case EMPRESA:
                Empresa empresa = new Empresa();
                empresa.setId(savedUsuario.getId());
                empresa.setNome(savedUsuario.getNome());
                empresa.setEmail(savedUsuario.getEmail());
                empresa.setSenha(savedUsuario.getSenha());
                empresa.setTipoUsuario(savedUsuario.getTipoUsuario());
                return ResponseEntity.ok(empresaService.save(empresa));
                
            default:
                throw new IllegalArgumentException("Tipo de usuário inválido");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> updateUser(@PathVariable UUID id, @RequestBody Usuario usuario) {
        return ResponseEntity.ok(usuarioService.update(id, usuario));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable UUID id) {
        usuarioService.delete(id);
        return ResponseEntity.noContent().build();
    }
} 