package com.estudantil.moeda.repository;

import com.estudantil.moeda.model.Transacao;
import com.estudantil.moeda.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface TransacaoRepository extends JpaRepository<Transacao, UUID> {
    List<Transacao> findByRemetenteId(UUID remetenteId);
    List<Transacao> findByDestinatarioId(UUID destinatarioId);
    List<Transacao> findByRemetenteOrDestinatario(Usuario remetente, Usuario destinatario);
    List<Transacao> findAllById(UUID id);
    
    @Query("SELECT t FROM Transacao t WHERE t.remetente.id = :id OR t.destinatario.id = :id")
    List<Transacao> findAllByRemetenteIdOrDestinatarioId(@Param("id") UUID id);
} 