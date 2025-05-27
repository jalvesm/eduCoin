INSERT INTO public.usuario (id, nome, email, senha, tipo_usuario)
VALUES
  (uuid_generate_v4(), 'Ana Silva', 'ana.silva@email.com', 'senha123', 'ALUNO'),
  (uuid_generate_v4(), 'Bruno Costa', 'bruno.costa@email.com', 'senha123', 'ALUNO'),
  (uuid_generate_v4(), 'Carla Souza', 'carla.souza@email.com', 'senha123', 'ALUNO'),
  (uuid_generate_v4(), 'Diego Martins', 'diego.martins@email.com', 'senha123', 'ALUNO'),
  (uuid_generate_v4(), 'Tech Solutions Ltda', 'contato@techsolutions.com', 'senha123', 'EMPRESA'),
  (uuid_generate_v4(), 'Inova Corp', 'contato@inovacorp.com', 'senha123', 'EMPRESA'),
  (uuid_generate_v4(), 'SoftWare House', 'contato@softwarehouse.com', 'senha123', 'EMPRESA'),
  (uuid_generate_v4(), 'Green Energy Inc', 'contato@greenenergy.com', 'senha123', 'EMPRESA'),
  (uuid_generate_v4(), 'Professor João Pereira', 'joao.pereira@email.com', 'senha123', 'PROFESSOR'),
  (uuid_generate_v4(), 'Professora Maria Oliveira', 'maria.oliveira@email.com', 'senha123', 'PROFESSOR'),
  (uuid_generate_v4(), 'Professor Carlos Lima', 'carlos.lima@email.com', 'senha123', 'PROFESSOR'),
  (uuid_generate_v4(), 'Professora Fernanda Alves', 'fernanda.alves@email.com', 'senha123', 'PROFESSOR');

INSERT INTO public.instituicao (id, nome, endereco)
VALUES
  (uuid_generate_v4(), 'PUC Rio', 'Rua Marquês de São Vicente, 225 - Gávea, Rio de Janeiro - RJ'),
  (uuid_generate_v4(), 'PUC Minas', 'Av. Dom José Gaspar, 500 - Coração Eucarístico, Belo Horizonte - MG'),
  (uuid_generate_v4(), 'PUC-SP', 'Rua Monte Alegre, 984 - Perdizes, São Paulo - SP');

INSERT INTO public.aluno (id, cpf, rg, endereco, instituicao_id, curso, saldo_moedas)
VALUES
  ('6b0d45c8-db4c-4cf9-ad00-4c6314636ec5', '123.456.789-00', 'MG-12.345.678', 'Rua das Flores, 123, Belo Horizonte', '5dd54007-aae3-4ea6-a267-16178042766d', 'Engenharia de Software', 150.0),
  ('0a77e311-956b-4f14-8993-9315cadb9c7f', '987.654.321-00', 'SP-98.765.432', 'Av. Paulista, 1000, São Paulo', 'aef31c97-b6a0-4114-a74c-270b599f1836', 'Ciência da Computação', 200.0),
  ('0028d2a9-77d8-4d52-b42c-a1809cf9b726', '111.222.333-44', 'RJ-11.222.333', 'Rua das Acácias, 45, Rio de Janeiro', 'c6b67ac6-68e0-42af-8196-e4579ab4965e', 'Sistemas de Informação', 100.0),
  ('07e28aae-fbb9-4ace-945c-213a2fece6d3', '555.666.777-88', 'MG-55.666.777', 'Rua Central, 321, Belo Horizonte', '5dd54007-aae3-4ea6-a267-16178042766d', 'Engenharia Elétrica', 50.0);

INSERT INTO public.professor (id, cpf, departamento, quantidade_moedas, instituicao_id)
VALUES
  ('5660b3ae-2c6b-420e-98ef-faf876dc0f83', '123.456.789-99', 'Engenharia de Software', 1200, '5dd54007-aae3-4ea6-a267-16178042766d'),
  ('7c004735-fe14-486a-8cc4-69c46d68c1b1', '987.654.321-88', 'Ciência da Computação', 1500, 'aef31c97-b6a0-4114-a74c-270b599f1836'),
  ('0bc52d67-68f8-430f-92b0-4f2d1c8a98c6', '111.222.333-77', 'Matemática Aplicada', 1000, 'c6b67ac6-68e0-42af-8196-e4579ab4965e'),
  ('467e05ee-7ded-4b53-b3e7-da37cf95a7d2', '555.666.777-66', 'Física', 1100, '5dd54007-aae3-4ea6-a267-16178042766d');


INSERT INTO public.vantagem (id, titulo, descricao, imagem, custo_moedas, empresa_id) VALUES
  (uuid_generate_v4(), 'Desconto em Livros', '10% de desconto em qualquer livro da loja parceira.', 'https://exemplo.com/imagem1.jpg', 100, 'eda6f93b-e6d0-4476-9302-1abe10cbf78f'),
  (uuid_generate_v4(), 'Café Grátis', 'Um café grátis na compra de qualquer lanche.', 'https://exemplo.com/imagem2.jpg', 50, 'b08ec42e-df4a-4919-9ad8-c932248c188c'),
  (uuid_generate_v4(), 'Aula Experimental', 'Aula experimental gratuita em academia parceira.', 'https://exemplo.com/imagem3.jpg', 80, '31f529f0-d679-4892-b674-9e8feb41ed8d'),
  (uuid_generate_v4(), 'Brinde Exclusivo', 'Receba um brinde exclusivo ao visitar a loja.', 'https://exemplo.com/imagem4.jpg', 60, '629f391d-64bd-46bc-98a3-1c7e7362378f'),
  (uuid_generate_v4(), 'Desconto em Cursos', '20% de desconto em cursos selecionados.', 'https://exemplo.com/imagem5.jpg', 200, 'eda6f93b-e6d0-4476-9302-1abe10cbf78f'),
  (uuid_generate_v4(), 'Voucher Alimentação', 'Voucher de R$ 15,00 para alimentação.', 'https://exemplo.com/imagem6.jpg', 120, 'b08ec42e-df4a-4919-9ad8-c932248c188c');


INSERT INTO public.vantagem (id, titulo, descricao, imagem, custo_moedas, empresa_id) VALUES
  (uuid_generate_v4(), 'Kit de Material Escolar', 'Receba um kit completo de material escolar.', 'https://exemplo.com/kit-escolar.jpg', 180, '31f529f0-d679-4892-b674-9e8feb41ed8d'),
  (uuid_generate_v4(), 'Desconto em Restaurantes', '15% de desconto em restaurantes parceiros.', 'https://exemplo.com/restaurante.jpg', 90, 'b08ec42e-df4a-4919-9ad8-c932248c188c'),
  (uuid_generate_v4(), 'Ingresso para Cinema', 'Um ingresso para qualquer sessão de cinema.', 'https://exemplo.com/cinema.jpg', 110, 'eda6f93b-e6d0-4476-9302-1abe10cbf78f'),
  (uuid_generate_v4(), 'Sessão de Fotos Profissional', 'Sessão de fotos em estúdio profissional.', 'https://exemplo.com/fotos.jpg', 250, '629f391d-64bd-46bc-98a3-1c7e7362378f'),
  (uuid_generate_v4(), 'Assinatura de Revista', 'Assinatura digital de revista por 6 meses.', 'https://exemplo.com/revista.jpg', 130, '31f529f0-d679-4892-b674-9e8feb41ed8d');