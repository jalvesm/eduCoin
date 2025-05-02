BEGIN;

CREATE TABLE IF NOT EXISTS public.aluno
(
    id              BIGINT           NOT NULL,
    cpf             VARCHAR(14),
    rg              VARCHAR(20),
    endereco        VARCHAR(255),
    instituicao_id  BIGINT,
    curso           VARCHAR(100),
    saldo_moedas    DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    CONSTRAINT aluno_pkey     PRIMARY KEY (id),
    CONSTRAINT aluno_cpf_key  UNIQUE (cpf)
);

CREATE TABLE IF NOT EXISTS public.instituicao
(
    id        BIGSERIAL       NOT NULL PRIMARY KEY,
    nome      VARCHAR(255)    NOT NULL,
    endereco  VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS public.professor
(
    id                   BIGINT           NOT NULL,
    cpf                  VARCHAR(14),
    departamento         VARCHAR(100),
    quantidade_moedas    DOUBLE PRECISION NOT NULL DEFAULT 1000,
    instituicao_id       BIGINT,
    CONSTRAINT professor_pkey    PRIMARY KEY (id),
    CONSTRAINT professor_cpf_key UNIQUE (cpf)
);

CREATE TABLE IF NOT EXISTS public.usuario
(
    id                 BIGSERIAL       NOT NULL PRIMARY KEY,
    nome               VARCHAR(255)    NOT NULL,
    email              VARCHAR(255)    NOT NULL,
    senha              VARCHAR(255)    NOT NULL,
    CONSTRAINT usuario_email_key UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS public.empresa
(
    id                   BIGINT        NOT NULL,
    cnpj                 VARCHAR(18),
    CONSTRAINT empresa_pkey     PRIMARY KEY (id),
    CONSTRAINT empresa_cnpj_key UNIQUE (cnpj)
);

CREATE TABLE IF NOT EXISTS public.vantagem
(
    id            BIGSERIAL       NOT NULL PRIMARY KEY,
    titulo        VARCHAR(255),
    descricao     TEXT,
    imagem        VARCHAR(255),
    custo_moedas  INTEGER,
    empresa_id    BIGINT          NOT NULL
);

CREATE TABLE IF NOT EXISTS public.cupom
(
    id            BIGSERIAL       NOT NULL PRIMARY KEY,
    codigo        VARCHAR(10)     NOT NULL,
    data_geracao  TIMESTAMPTZ     NOT NULL DEFAULT now(),
    aluno_id      BIGINT          NOT NULL,
    vantagem_id   BIGINT          NOT NULL
);

CREATE TABLE IF NOT EXISTS public.transacao
(
    id               BIGSERIAL       NOT NULL PRIMARY KEY,
    valor            DOUBLE PRECISION NOT NULL,
    descricao        TEXT              NOT NULL,
    remetente_id     BIGINT            NOT NULL,
    destinatario_id  BIGINT            NOT NULL,
    data_transacao   TIMESTAMPTZ       NOT NULL DEFAULT now()
);

-- Constraints de chave estrangeira e índices (na mesma ordem original)
ALTER TABLE IF EXISTS public.aluno
    ADD CONSTRAINT aluno_instituicao_id_fkey
      FOREIGN KEY (instituicao_id)
      REFERENCES public.instituicao (id)
      ON UPDATE NO ACTION
      ON DELETE SET NULL;

ALTER TABLE IF EXISTS public.aluno
    ADD CONSTRAINT fk_aluno_usuario
      FOREIGN KEY (id)
      REFERENCES public.usuario (id)
      ON UPDATE NO ACTION
      ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS aluno_pkey
    ON public.aluno(id);

ALTER TABLE IF EXISTS public.professor
    ADD CONSTRAINT fk_professor_usuario
      FOREIGN KEY (id)
      REFERENCES public.usuario (id)
      ON UPDATE NO ACTION
      ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS professor_pkey
    ON public.professor(id);

ALTER TABLE IF EXISTS public.professor
    ADD CONSTRAINT professor_instituicao_id_fkey
      FOREIGN KEY (instituicao_id)
      REFERENCES public.instituicao (id)
      ON UPDATE NO ACTION
      ON DELETE SET NULL;

ALTER TABLE IF EXISTS public.empresa
    ADD CONSTRAINT fk_empresa_usuario
      FOREIGN KEY (id)
      REFERENCES public.usuario (id)
      ON UPDATE NO ACTION
      ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS empresa_pkey
    ON public.empresa(id);

ALTER TABLE IF EXISTS public.vantagem
    ADD CONSTRAINT vantagem_empresa_id_fkey
      FOREIGN KEY (empresa_id)
      REFERENCES public.empresa (id)
      ON UPDATE NO ACTION
      ON DELETE CASCADE;

ALTER TABLE IF EXISTS public.cupom
    ADD CONSTRAINT cupom_aluno_id_fkey
      FOREIGN KEY (aluno_id)
      REFERENCES public.aluno (id)
      ON UPDATE NO ACTION
      ON DELETE CASCADE;

ALTER TABLE IF EXISTS public.cupom
    ADD CONSTRAINT cupom_vantagem_id_fkey
      FOREIGN KEY (vantagem_id)
      REFERENCES public.vantagem (id)
      ON UPDATE NO ACTION
      ON DELETE CASCADE;

ALTER TABLE IF EXISTS public.transacao
    ADD CONSTRAINT transacao_destinatario_id_fkey
      FOREIGN KEY (destinatario_id)
      REFERENCES public.usuario (id)
      ON UPDATE NO ACTION
      ON DELETE RESTRICT;

ALTER TABLE IF EXISTS public.transacao
    ADD CONSTRAINT transacao_remetente_id_fkey
      FOREIGN KEY (remetente_id)
      REFERENCES public.usuario (id)
      ON UPDATE NO ACTION
      ON DELETE RESTRICT;

END;
