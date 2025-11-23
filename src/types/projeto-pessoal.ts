export interface ProjetoPessoal {
  id: number;
  titulo: string;
  descricao: string;
  concluido: boolean;
  dataCriacao: string;
  dataConclusao: string | null;
  usuario: {
    id: number;
  };
}
