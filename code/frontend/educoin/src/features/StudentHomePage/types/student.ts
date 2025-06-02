export interface Vantagem {
    id: number;
    titulo: string;
    descricao: string;
    imagem: string;
    custoMoedas: number;
  }
  
  export interface Cupom {
    id: string;
    codigo: string;
    dataGeracao: string;
    vantagem: {
      id: string;
      titulo: string;
    };
}

export interface Instituicao {
  id: string;
  nome: string;
  endereco: string;
}

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  senha: string;
  tipoUsuario: string;
  cpf: string;
  departamento?: string;
  quantidadeMoedas?: number;
  rg?: string;
  endereco?: string;
  instituicao: Instituicao;
  curso?: string;
  saldoMoedas?: number;
}

export interface DetailTransactionData {
  id: string;
  valor: number;
  descricao: string;
  remetente: Usuario;
  destinatario: Usuario;
  dataTransacao: string; 
  tipo: string;
}
