-- Cria o tipo ENUM
CREATE TYPE tipo_usuario AS ENUM ('ALUNO', 'EMPRESA', 'PROFESSOR');

-- Adiciona a coluna 'tipo' na tabela 'usuario'
ALTER TABLE public.usuario
ADD COLUMN tipo tipo_usuario NOT NULL DEFAULT 'ALUNO';
