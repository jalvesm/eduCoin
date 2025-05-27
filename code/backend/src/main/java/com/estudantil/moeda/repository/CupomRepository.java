package com.estudantil.moeda.repository;

import com.estudantil.moeda.model.Aluno;
import com.estudantil.moeda.model.Cupom;
import com.estudantil.moeda.model.Transacao;
import com.estudantil.moeda.model.Vantagem;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CupomRepository extends JpaRepository<Cupom, UUID> {

    List<Cupom> findAllByAluno(Aluno aluno);

    @Query("SELECT c FROM Cupom c WHERE c.aluno = :aluno AND c.vantagem = :vantagem AND c.transacao = :transacao")
    Optional<Cupom> findCupomByAlunoVantagemTransacao(
            @Param("aluno") Aluno aluno,
            @Param("vantagem") Vantagem vantagem,
            @Param("transacao") Transacao transacao);
}