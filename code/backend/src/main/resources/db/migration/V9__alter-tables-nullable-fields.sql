-- Altera a tabela aluno para tornar campos opcionais
ALTER TABLE public.aluno
    ALTER COLUMN cpf DROP NOT NULL,
    ALTER COLUMN rg DROP NOT NULL,
    ALTER COLUMN endereco DROP NOT NULL,
    ALTER COLUMN curso DROP NOT NULL,
    ALTER COLUMN instituicao_id DROP NOT NULL;

-- Altera a tabela professor para tornar campos opcionais
ALTER TABLE public.professor
    ALTER COLUMN cpf DROP NOT NULL,
    ALTER COLUMN departamento DROP NOT NULL,
    ALTER COLUMN instituicao_id DROP NOT NULL;

-- Altera a tabela empresa para tornar campos opcionais
ALTER TABLE public.empresa
    ALTER COLUMN cnpj DROP NOT NULL; 