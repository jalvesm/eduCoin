package com.estudantil.moeda.service;

import com.estudantil.moeda.model.Usuario;
import com.estudantil.moeda.repository.UsuarioRepository;
import com.estudantil.moeda.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public List<Usuario> findAll() {
        return usuarioRepository.findAll();
    }

    public Usuario findById(UUID id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));
    }

    public Usuario save(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public Usuario update(UUID id, Usuario usuario) {
        if (!usuarioRepository.existsById(id)) {
            throw new ResourceNotFoundException("Usuário não encontrado");
        }
        usuario.setId(id);
        return usuarioRepository.save(usuario);
    }

    public void delete(UUID id) {
        if (!usuarioRepository.existsById(id)) {
            throw new ResourceNotFoundException("Usuário não encontrado");
        }
        usuarioRepository.deleteById(id);
    }

    public Optional<Usuario> autenticarUsuario(String email, String senha) {
        return usuarioRepository.findByEmailAndSenha(email, senha);
    }

    public void resetSenha(String email, String novaSenha) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));

        usuario.setSenha(novaSenha);
        usuarioRepository.save(usuario);
    }
}