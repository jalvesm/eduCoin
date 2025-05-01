-- Habilita geração de UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela abstrata de usuários
CREATE TABLE IF NOT EXISTS public.usuario (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

-- Instituições de ensino
CREATE TABLE IF NOT EXISTS public.instituicao (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(255) NOT NULL,
    endereco VARCHAR(255)
);

-- Alunos (estendem usuário)
CREATE TABLE IF NOT EXISTS public.aluno (
    id UUID NOT NULL PRIMARY KEY,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    rg VARCHAR(20) NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    instituicao_id UUID NOT NULL REFERENCES public.instituicao(id) ON DELETE SET NULL,
    curso VARCHAR(100) NOT NULL,
    saldo_moedas DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    CONSTRAINT fk_aluno_usuario FOREIGN KEY (id) 
        REFERENCES public.usuario(id) ON DELETE CASCADE
);

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

-- Empresas parceiras (estendem usuário)
CREATE TABLE IF NOT EXISTS public.empresa (
    id UUID NOT NULL PRIMARY KEY,
    cnpj VARCHAR(18) NOT NULL UNIQUE,
    CONSTRAINT fk_empresa_usuario FOREIGN KEY (id) 
        REFERENCES public.usuario(id) ON DELETE CASCADE
);

-- Vantagens oferecidas pelas empresas
CREATE TABLE IF NOT EXISTS public.vantagem (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    imagem VARCHAR(255),
    custo_moedas INTEGER NOT NULL,
    empresa_id UUID NOT NULL REFERENCES public.empresa(id) ON DELETE CASCADE
);

-- Cupons gerados no resgate de vantagens
CREATE TABLE IF NOT EXISTS public.cupom (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    codigo UUID NOT NULL DEFAULT uuid_generate_v4(),
    data_geracao DATE NOT NULL DEFAULT CURRENT_DATE,
    aluno_id UUID NOT NULL REFERENCES public.aluno(id) ON DELETE CASCADE,
    vantagem_id UUID NOT NULL REFERENCES public.vantagem(id) ON DELETE CASCADE
);

-- Transações de moedas entre usuários
CREATE TABLE IF NOT EXISTS public.transacao (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    valor DOUBLE PRECISION NOT NULL,
    descricao TEXT NOT NULL,
    remetente_id UUID NOT NULL REFERENCES public.usuario(id) ON DELETE RESTRICT,
    destinatario_id UUID NOT NULL REFERENCES public.usuario(id) ON DELETE RESTRICT,
    data_transacao TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
