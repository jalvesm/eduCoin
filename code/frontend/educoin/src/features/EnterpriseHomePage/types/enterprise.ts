export interface Empresa {
    id: string;
    nome: string;
    email: string;
    senha: string;
    tipoUsuario: string;
    cnpj: string;
  }
  
  export interface Vantagem {
    id: string;
    titulo: string;
    descricao: string;
    imagem: string;
    custoMoedas: number;
    empresa: Empresa;
  }

  export interface NovaVantagem {
    titulo: string;
    descricao: string;
    imagem: string;
    custoMoedas: number;
    empresaId: string;
  }
  