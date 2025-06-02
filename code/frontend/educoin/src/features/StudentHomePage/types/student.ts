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