-- Adiciona coluna 'active' para controle do uso do cupom
ALTER TABLE public.cupom
ADD COLUMN active BOOLEAN NOT NULL DEFAULT TRUE;

-- Adiciona coluna 'transacao_id' para referência à transação relacionada
ALTER TABLE public.cupom
ADD COLUMN transacao_id UUID NOT NULL REFERENCES public.transacao(id) ON DELETE CASCADE;