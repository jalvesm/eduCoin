DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'tipo_transacao') THEN
        CREATE TYPE tipo_transacao AS ENUM ('RESGATE_VANTAGEM', 'ATRIBUICAO_MOEDAS');
    END IF;
END
$$;

ALTER TABLE public.transacao
ADD COLUMN IF NOT EXISTS tipo tipo_transacao;
