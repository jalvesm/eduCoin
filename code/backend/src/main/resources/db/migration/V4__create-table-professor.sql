-- Professores (estendem usuário)
CREATE TABLE IF NOT EXISTS public.professor (
    id UUID NOT NULL PRIMARY KEY,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    departamento VARCHAR(100) NOT NULL,
    quantidade_moedas DOUBLE PRECISION NOT NULL DEFAULT 1000,
    instituicao_id UUID NOT NULL REFERENCES public.instituicao(id) ON DELETE SET NULL,
    CONSTRAINT fk_professor_usuario FOREIGN KEY (id) 
        REFERENCES public.usuario(id) ON DELETE CASCADE
);