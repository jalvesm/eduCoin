package com.estudantil.moeda.service;

import com.estudantil.moeda.model.Aluno;
import com.estudantil.moeda.model.Instituicao;
import com.estudantil.moeda.model.enums.TipoUsuario;
import com.estudantil.moeda.repository.AlunoRepository;
import com.estudantil.moeda.repository.InstituicaoRepository;
import com.estudantil.moeda.dto.CreateAlunoDTO;
import com.estudantil.moeda.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;


@RequiredArgsConstructor
@Service
public class AlunoService {

    private final AlunoRepository alunoRepository;

    @Autowired
    private InstituicaoRepository instituicaoRepository;

    public Aluno criarAluno(CreateAlunoDTO alunoDTO) {
        Instituicao instituicao = instituicaoRepository.findById(alunoDTO.getInstituicaoId())
                .orElseThrow(() -> new RuntimeException("Instituição não encontrada"));

        if (alunoRepository.existsByEmail(alunoDTO.getEmail())) {
            throw new IllegalArgumentException("O e-mail informado já está cadastrado.");
        }

        if (alunoRepository.existsByCpf(alunoDTO.getCpf())) {
            throw new IllegalArgumentException("O CPF informado já está cadastrado.");
        }
        
        Aluno aluno = Aluno.builder()
                .nome(alunoDTO.getNome())
                .email(alunoDTO.getEmail())
                .senha(alunoDTO.getSenha())
                .tipo(TipoUsuario.ALUNO)
                .cpf(alunoDTO.getCpf())
                .rg(alunoDTO.getRg())
                .endereco(alunoDTO.getEndereco())
                .instituicao(instituicao)
                .curso(alunoDTO.getCurso())
                .saldoMoedas(0.0)
                .build();

        return alunoRepository.save(aluno);
    }

    public List<Aluno> findAll() {
        return alunoRepository.findAll();
    }

    public Aluno findById(UUID id) {
        return alunoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Estudante não encontrado!"));
    }

    public Aluno save(Aluno aluno) {
        return alunoRepository.save(aluno);
    }

    public Aluno update(UUID id, Aluno aluno) {
        if (!alunoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Estudante não encontrado!");
        }
        aluno.setId(id);
        return alunoRepository.save(aluno);
    }

    public void delete(UUID id) {
        if (!alunoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Estudante não encontrado!");
        }
        alunoRepository.deleteById(id);
    }
}