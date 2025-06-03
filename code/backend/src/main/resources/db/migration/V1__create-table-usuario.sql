-- Habilita geração de UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TYPE IF EXISTS tipo_usuario;
CREATE TYPE tipo_usuario AS ENUM ('ALUNO', 'EMPRESA', 'PROFESSOR');


CREATE TABLE IF NOT EXISTS public.usuario (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    tipo tipo_usuario NOT NULL DEFAULT 'ALUNO'  -- Adicionando a coluna tipo_usuario com valor default 'ALUNO'
);