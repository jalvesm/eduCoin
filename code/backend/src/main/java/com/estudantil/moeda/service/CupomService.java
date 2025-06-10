package com.estudantil.moeda.service;

import com.estudantil.moeda.dto.CreateCupomDTO;
import com.estudantil.moeda.model.Aluno;
import com.estudantil.moeda.model.Cupom;
import com.estudantil.moeda.model.Empresa;
import com.estudantil.moeda.model.Vantagem;
import com.estudantil.moeda.repository.AlunoRepository;
import com.estudantil.moeda.repository.CupomRepository;
import com.estudantil.moeda.repository.EmpresaRepository;
import com.estudantil.moeda.repository.VantagemRepository;
import com.estudantil.moeda.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class CupomService {

    private final AlunoRepository alunoRepository;
    private final CupomRepository cupomRepository;
    private final EmpresaRepository empresaRepository;
    private final VantagemRepository vantagemRepository;

    public List<Cupom> findAll() {
        return cupomRepository.findAll();
    }

    public Cupom findById(UUID id) {
        return cupomRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cupom não encontrado"));
    }

    public Cupom save(CreateCupomDTO dto) {
        if (!isValidUUID(dto.getCodigo())) {
        throw new IllegalArgumentException("O código do cupom deve ser um UUID válido.");
        }
        if (cupomRepository.existsByCodigo(UUID.fromString(dto.getCodigo()))) {
        throw new IllegalArgumentException("Já existe um cupom com esse código.");
         }
        Aluno aluno = alunoRepository.findById(dto.getAlunoId())
                .orElseThrow(() -> new ResourceNotFoundException("Aluno não encontrado"));
        
        Empresa empresa = empresaRepository.findById(dto.getEmpresaId())
                .orElseThrow(() -> new ResourceNotFoundException("Empresa não encontrada"));

        Vantagem vantagem = vantagemRepository.findByEmpresaAndCustoMoedas(empresa, dto.getValor().intValue())
                .orElseThrow(() -> new ResourceNotFoundException("Vantagem não encontrada para o valor especificado"));

        Cupom cupom = new Cupom();
        cupom.setCodigo(UUID.fromString(dto.getCodigo()));
        cupom.setAluno(aluno);
        cupom.setVantagem(vantagem);
        cupom.setActive(true);
        
        return cupomRepository.save(cupom);
    }

    private boolean isValidUUID(String codigo) {
        try {
            UUID.fromString(codigo);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public Cupom update(UUID id, CreateCupomDTO dto) {
        Cupom existingCupom = findById(id);
        
        Aluno aluno = alunoRepository.findById(dto.getAlunoId())
                .orElseThrow(() -> new ResourceNotFoundException("Aluno não encontrado"));
        
        Empresa empresa = empresaRepository.findById(dto.getEmpresaId())
                .orElseThrow(() -> new ResourceNotFoundException("Empresa não encontrada"));

        Vantagem vantagem = vantagemRepository.findByEmpresaAndCustoMoedas(empresa, dto.getValor().intValue())
                .orElseThrow(() -> new ResourceNotFoundException("Vantagem não encontrada para o valor especificado"));

        existingCupom.setCodigo(UUID.fromString(dto.getCodigo()));
        existingCupom.setAluno(aluno);
        existingCupom.setVantagem(vantagem);
        
        return cupomRepository.save(existingCupom);
    }

    public void delete(UUID id) {
        if (!cupomRepository.existsById(id)) {
            throw new ResourceNotFoundException("Cupom não encontrado");
        }
        cupomRepository.deleteById(id);
    }

    public List<Cupom> findAllFromAluno(UUID alunoId) {
        Aluno aluno = alunoRepository.findById(alunoId)
                .orElseThrow(() -> new IllegalArgumentException("Aluno não encontrado."));
        return cupomRepository.findAllByAluno(aluno);
    }
}