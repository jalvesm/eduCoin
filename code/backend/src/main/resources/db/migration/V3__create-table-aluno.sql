-- Alunos (estendem usuário)
CREATE TABLE IF NOT EXISTS public.aluno (
    id UUID NOT NULL PRIMARY KEY,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    rg VARCHAR(20) NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    instituicao_id UUID NOT NULL REFERENCES public.instituicao(id) ON DELETE SET NULL,
    curso VARCHAR(100) NOT NULL,
    saldo_moedas DOUBLE PRECISION NOT NULL DEFAULT 0,
    CONSTRAINT fk_aluno_usuario FOREIGN KEY (id) 
        REFERENCES public.usuario(id) ON DELETE CASCADE
);