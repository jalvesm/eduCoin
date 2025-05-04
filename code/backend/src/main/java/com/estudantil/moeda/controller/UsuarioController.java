package com.estudantil.moeda.controller;

import com.estudantil.moeda.model.*;
import com.estudantil.moeda.service.*;
import com.estudantil.moeda.dto.*;
import com.estudantil.moeda.enums.TipoUsuario;
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
    private final InstituicaoService instituicaoService;

    @GetMapping
    public ResponseEntity<List<Usuario>> listAllUsers() {
        return ResponseEntity.ok(usuarioService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> getUser(@PathVariable UUID id) {
        return ResponseEntity.ok(usuarioService.findById(id));
    }

    //Cria um usuario baseado no tipo de usuario
    @PostMapping
    public ResponseEntity<Usuario> createUser(@RequestBody CreateUsuarioDTO createUsuarioDTO) {
        switch (createUsuarioDTO.getTipoUsuario()) {
            case ALUNO:
                Aluno aluno = new Aluno();
                aluno.setNome(createUsuarioDTO.getNome());
                aluno.setEmail(createUsuarioDTO.getEmail());
                aluno.setSenha(createUsuarioDTO.getSenha());
                aluno.setTipoUsuario(createUsuarioDTO.getTipoUsuario());
                return ResponseEntity.ok(alunoService.save(aluno));
                
            case PROFESSOR:
                Professor professor = new Professor();
                professor.setNome(createUsuarioDTO.getNome());
                professor.setEmail(createUsuarioDTO.getEmail());
                professor.setSenha(createUsuarioDTO.getSenha());
                professor.setTipoUsuario(createUsuarioDTO.getTipoUsuario());
                professor.setQuantidadeMoedas(Professor.SALDO_SEMESTRAL_DE_MOEDAS);

                if (createUsuarioDTO instanceof CreateProfessorDTO) {
                    CreateProfessorDTO professorDTO = (CreateProfessorDTO) createUsuarioDTO;
                    if (professorDTO.getInstituicaoId() != null) {
                        Instituicao instituicao = instituicaoService.findById(professorDTO.getInstituicaoId());
                        professor.setInstituicao(instituicao);
                    }
                }
                
                return ResponseEntity.ok(professorService.save(professor));
                
            case EMPRESA:
                Empresa empresa = new Empresa();
                empresa.setNome(createUsuarioDTO.getNome());
                empresa.setEmail(createUsuarioDTO.getEmail());
                empresa.setSenha(createUsuarioDTO.getSenha());
                empresa.setTipoUsuario(createUsuarioDTO.getTipoUsuario());
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