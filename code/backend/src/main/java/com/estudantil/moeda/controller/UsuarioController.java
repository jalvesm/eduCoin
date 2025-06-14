package com.estudantil.moeda.controller;

import com.estudantil.moeda.model.*;
import com.estudantil.moeda.service.*;

import jakarta.validation.Valid;

import com.estudantil.moeda.dto.*;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:5173")
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

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody @Valid CreateUsuarioDTO createUsuarioDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            for (FieldError error : bindingResult.getFieldErrors()) {
                errors.put(error.getField(), error.getDefaultMessage());
            }
            return ResponseEntity.badRequest().body(errors);
        }

        switch (createUsuarioDTO.getTipoUsuario()) {
            case ALUNO:
                if (createUsuarioDTO instanceof CreateAlunoDTO alunoDTO) {
                    Aluno aluno = new Aluno();
                    aluno.setNome(alunoDTO.getNome());
                    aluno.setEmail(alunoDTO.getEmail());
                    aluno.setSenha(alunoDTO.getSenha());
                    aluno.setTipoUsuario(alunoDTO.getTipoUsuario());
                    aluno.setCpf(alunoDTO.getCpf());
                    aluno.setRg(alunoDTO.getRg());
                    aluno.setEndereco(alunoDTO.getEndereco());
                    aluno.setCurso(alunoDTO.getCurso());
                    aluno.setSaldoMoedas(alunoDTO.getSaldoMoedas());

                    if (alunoDTO.getInstituicaoId() != null) {
                        Instituicao instituicao = instituicaoService.findById(alunoDTO.getInstituicaoId());
                        aluno.setInstituicao(instituicao);
                    }

                    return ResponseEntity.ok(alunoService.save(aluno));
                }
                throw new IllegalArgumentException("Dados inválidos para aluno.");

            case PROFESSOR:
                if (createUsuarioDTO instanceof CreateProfessorDTO professorDTO) {
                    Professor professor = new Professor();
                    professor.setNome(professorDTO.getNome());
                    professor.setEmail(professorDTO.getEmail());
                    professor.setSenha(professorDTO.getSenha());
                    professor.setTipoUsuario(professorDTO.getTipoUsuario());
                    professor.setCpf(professorDTO.getCpf());
                    professor.setDepartamento(professorDTO.getDepartamento());
                    professor.setQuantidadeMoedas(Professor.SALDO_SEMESTRAL_DE_MOEDAS);

                    if (professorDTO.getInstituicaoId() != null) {
                        Instituicao instituicao = instituicaoService.findById(professorDTO.getInstituicaoId());
                        professor.setInstituicao(instituicao);
                    }

                    return ResponseEntity.ok(professorService.save(professor));
                }
                throw new IllegalArgumentException("Dados inválidos para professor.");

            case EMPRESA:
                if (createUsuarioDTO instanceof CreateEmpresaDTO empresaDTO) {
                    Empresa empresa = new Empresa();
                    empresa.setNome(empresaDTO.getNome());
                    empresa.setEmail(empresaDTO.getEmail());
                    empresa.setSenha(empresaDTO.getSenha());
                    empresa.setTipoUsuario(empresaDTO.getTipoUsuario());
                    empresa.setCnpj(empresaDTO.getCnpj());

                    return ResponseEntity.ok(empresaService.save(empresa));
                }
                throw new IllegalArgumentException("Dados inválidos para empresa.");

            default:
                throw new IllegalArgumentException("Tipo de usuário inválido.");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid LoginRequestDTO loginRequest, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            for (FieldError error : bindingResult.getFieldErrors()) {
                errors.put(error.getField(), error.getDefaultMessage());
            }
            return ResponseEntity.badRequest().body(errors);
        }

        Optional<Usuario> usuarioOptional = usuarioService.autenticarUsuario(loginRequest.getEmail(),
                loginRequest.getSenha());

        if (usuarioOptional.isPresent()) {
            Usuario usuario = usuarioOptional.get();
            LoginResponseDTO response = new LoginResponseDTO();
            response.setId(usuario.getId());
            response.setNome(usuario.getNome());
            response.setEmail(usuario.getEmail());
            response.setTipoUsuario(usuario.getTipoUsuario());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401).body("Credenciais inválidas");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable UUID id, @RequestBody @Valid Usuario usuario, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            for (FieldError error : bindingResult.getFieldErrors()) {
                errors.put(error.getField(), error.getDefaultMessage());
            }
            return ResponseEntity.badRequest().body(errors);
        }
        return ResponseEntity.ok(usuarioService.update(id, usuario));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable UUID id) {
        usuarioService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/reset-senha")
    public ResponseEntity<?> resetSenha(@RequestBody @Valid ResetSenhaRequestDTO request, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            for (FieldError error : bindingResult.getFieldErrors()) {
                errors.put(error.getField(), error.getDefaultMessage());
            }
            return ResponseEntity.badRequest().body(errors);
        }

        try {
            usuarioService.resetSenha(request.getEmail(), request.getNovaSenha());
            return ResponseEntity.ok().body("Senha alterada com sucesso");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}