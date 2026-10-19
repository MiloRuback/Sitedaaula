-- ============================================================
-- SQL para criar a tabela e as policies de acesso público
-- Cole este código no SQL Editor do Supabase e clique em Run
-- ============================================================

-- Criar a tabela
CREATE TABLE cadastros (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    email VARCHAR(200) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    cidade VARCHAR(100),
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ativar Row Level Security (obrigatório no Supabase)
ALTER TABLE cadastros ENABLE ROW LEVEL SECURITY;

-- Policies de acesso público
-- SELECT (leitura)
CREATE POLICY "Permitir leitura pública"
ON cadastros FOR SELECT
USING (true);

-- INSERT (criação)
CREATE POLICY "Permitir inserção pública"
ON cadastros FOR INSERT
WITH CHECK (true);

-- UPDATE (atualização)
CREATE POLICY "Permitir atualização pública"
ON cadastros FOR UPDATE
USING (true)
WITH CHECK (true);

-- DELETE (exclusão)
CREATE POLICY "Permitir deleção pública"
ON cadastros FOR DELETE
USING (true);

-- Dados de exemplo (opcional - pode apagar se quiser)
INSERT INTO cadastros (nome, email, telefone, cidade) VALUES 
('Milo Silva', 'milo@email.com', '(11) 99999-9999', 'São Paulo'),
('Ana Costa', 'ana@email.com', '(21) 98888-8888', 'Rio de Janeiro'),
('Pedro Oliveira', 'pedro@email.com', '(31) 97777-7777', 'Belo Horizonte');
