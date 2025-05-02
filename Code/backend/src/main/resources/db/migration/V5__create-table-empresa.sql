-- Empresas parceiras (estendem usuário)
CREATE TABLE IF NOT EXISTS public.empresa (
    id UUID NOT NULL PRIMARY KEY,
    cnpj VARCHAR(18) NOT NULL UNIQUE,
    CONSTRAINT fk_empresa_usuario FOREIGN KEY (id) 
        REFERENCES public.usuario(id) ON DELETE CASCADE
);
