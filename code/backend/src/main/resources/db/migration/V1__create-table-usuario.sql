-- Habilita geração de UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela abstrata de usuários
CREATE TABLE IF NOT EXISTS public.usuario (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);