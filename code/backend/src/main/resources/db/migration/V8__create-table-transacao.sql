-- Transações de moedas entre usuários
CREATE TABLE IF NOT EXISTS public.transacao (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    valor DOUBLE PRECISION NOT NULL,
    descricao TEXT NOT NULL,
    remetente_id UUID NOT NULL REFERENCES public.usuario(id) ON DELETE RESTRICT,
    destinatario_id UUID NOT NULL REFERENCES public.usuario(id) ON DELETE RESTRICT,
    data_transacao TIMESTAMPTZ NOT NULL DEFAULT NOW()
);