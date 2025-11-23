export interface Meta {
  id: number;
  metaTotal: number;
  atual: number;
  concluida: boolean;
  dataCriacao: string;
  dataConclusao: string | null;
  usuario: {
    id: number;
  };
}