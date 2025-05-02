-- Vantagens oferecidas pelas empresas
CREATE TABLE IF NOT EXISTS public.vantagem (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    imagem VARCHAR(255),
    custo_moedas INTEGER NOT NULL,
    empresa_id UUID NOT NULL REFERENCES public.empresa(id) ON DELETE CASCADE
);