-- Instituições de ensino
CREATE TABLE IF NOT EXISTS public.instituicao (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(255) NOT NULL,
    endereco VARCHAR(255)
);
