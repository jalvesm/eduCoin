package com.estudantil.moeda.service;

import com.estudantil.moeda.model.Aluno;
import com.estudantil.moeda.model.Cupom;
import com.estudantil.moeda.model.Empresa;
import com.estudantil.moeda.model.Professor;
import com.estudantil.moeda.model.Transacao;
import com.estudantil.moeda.model.Vantagem;
import com.estudantil.moeda.repository.AlunoRepository;
import com.estudantil.moeda.repository.CupomRepository;
import com.estudantil.moeda.repository.EmpresaRepository;
import com.estudantil.moeda.repository.InstituicaoRepository;
import com.estudantil.moeda.repository.TransacaoRepository;
import com.estudantil.moeda.dto.ResgateVantagemRequestDTO;
import com.estudantil.moeda.dto.ResponseDTO;
import com.estudantil.moeda.exception.ResourceNotFoundException;
import com.estudantil.moeda.repository.VantagemRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class AlunoService {
    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private CupomRepository cupomRepository;

    private final InstituicaoRepository instituicaoRepository;

    @Autowired
    private VantagemRepository vantagemRepository;

    @Autowired
    private EmpresaRepository empresaRepository;

    @Autowired
    private TransacaoRepository transacaoRepository;

    /*
     * public Aluno criarAluno(CreateAlunoDTO alunoDTO) {
     * Instituicao instituicao =
     * instituicaoRepository.findById(alunoDTO.getInstituicaoId())
     * .orElseThrow(() -> new RuntimeException("Instituição não encontrada"));
     * 
     * if (alunoRepository.existsByEmail(alunoDTO.getEmail())) {
     * throw new IllegalArgumentException("O e-mail informado já está cadastrado.");
     * }
     * 
     * if (alunoRepository.existsByCpf(alunoDTO.getCpf())) {
     * throw new IllegalArgumentException("O CPF informado já está cadastrado.");
     * }
     * 
     * Aluno aluno = Aluno.builder()
     * .nome(alunoDTO.getNome())
     * .email(alunoDTO.getEmail())
     * .senha(alunoDTO.getSenha())
     * .tipo(TipoUsuario.ALUNO)
     * .cpf(alunoDTO.getCpf())
     * .rg(alunoDTO.getRg())
     * .endereco(alunoDTO.getEndereco())
     * .instituicao(instituicao)
     * .curso(alunoDTO.getCurso())
     * .saldoMoedas(0.0)
     * .build();
     * 
     * return alunoRepository.save(aluno);
     * }
     */

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

    public ResponseDTO resgatarVantagem(ResgateVantagemRequestDTO resgateVantagemRequestDTO) {
        Aluno aluno = alunoRepository.findById(resgateVantagemRequestDTO.alunoId())
                .orElseThrow(() -> new IllegalArgumentException("Aluno não encontrado."));

        Vantagem vantagem = vantagemRepository.findById(resgateVantagemRequestDTO.vantagemId())
                .orElseThrow(() -> new IllegalArgumentException("Vantagem não encontrada."));

        if (aluno.getSaldoMoedas() < vantagem.getCustoMoedas()) {
            throw new IllegalArgumentException("Saldo insuficiente para resgatar a vantagem.");
        }

        aluno.setSaldoMoedas(aluno.getSaldoMoedas() - vantagem.getCustoMoedas());
        alunoRepository.save(aluno);

        Empresa empresa = empresaRepository.findById(vantagem.getEmpresa().getId())
                .orElseThrow(() -> new IllegalArgumentException("Empresa não encontrada."));

        Transacao transacao = new Transacao();
        transacao.setRemetente(aluno);
        transacao.setDestinatario(empresa);
        transacao.setValor(vantagem.getCustoMoedas().doubleValue());
        transacao.setDescricao("Resgate de vantagem: " + vantagem.getTitulo());
        transacao.setDataTransacao(LocalDateTime.now());
        transacaoRepository.save(transacao);
        Cupom cupom = new Cupom(aluno, vantagem, transacao);
        cupomRepository.save(cupom);
        UUID codigoCupom = cupomRepository.findCupomByAlunoVantagemTransacao(aluno, vantagem, transacao)
                .orElseThrow(() -> new IllegalArgumentException("Cupom não encontrado."))
                .getCodigo();
                
        return new ResponseDTO("Resgate ocorrido com sucesso. Seu cupom: " + codigoCupom, 200);
    }

    public Double buscarSaldoPorId(UUID id) {
        Aluno aluno = alunoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Estudante não encontrado!"));
        return aluno.getSaldoMoedas();
    }
}