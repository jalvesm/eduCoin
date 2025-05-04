-- Cupons gerados no resgate de vantagens
CREATE TABLE IF NOT EXISTS public.cupom (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    codigo UUID NOT NULL DEFAULT uuid_generate_v4(),
    data_geracao DATE NOT NULL DEFAULT CURRENT_DATE,
    aluno_id UUID NOT NULL REFERENCES public.aluno(id) ON DELETE CASCADE,
    vantagem_id UUID NOT NULL REFERENCES public.vantagem(id) ON DELETE CASCADE
);
