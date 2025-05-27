export type Prisioner = {
  id: string
  nome: string
  idade: number
  cpf: string
  filiacao: string
  estadoCivil: 'Solteiro' | 'Casado' | 'Divorciado' | 'Viúvo' | string // pode ajustar conforme os valores esperados
  foto: string // URL da imagem
  reincidencia: boolean
  createdAt: string // ou Date, se for convertido
  updatedAt: string // ou Date
}

export type User = {
  id: string
  nome: string
  cpf: string
  cargo: 'ADM' | 'INSP'
  nivelPermissao: number
}

export type Alocacao = {
  id: string
  detentoId: string
  celaId: string
  dataAlocacao: string
}
export type AlocacaoPrisioner = {
  detentoId: string
  celaId: string
}

export type Cela = {
  id: string
  numero: number
  capacidade: number
  pavilhao: string
  alocacoes: Alocacao[]
}

export type PrisionerCela = Prisioner & {
  alocacoes: Alocacao[]
  infracoes: any[]
  transferencias: any[]
  visitas: any[]
}

export type Visita = {
  id: string
  detentoId: string
  visitanteId: string
  dataVisita: string // formato ISO string (ex: "2025-02-14T16:18:18.089Z")
  dataVisitaFim:string
  detento: Detento
  visitante: Visitante
}

export type Visitante = {
  id?: string
  nome: string
  grauParentesco: string | undefined // Adicionado grauParentesco como opcional
  cpf: string
  foto: string // Adicionado foto como opcional
  idDetento: string
}

export interface Detento {
  id: string
  nome: string
  idade: number
  estadoCivil: string
  cpf: string
  filiacao: string
  foto: string
  reincidencia: boolean
  createdAt: string // ou Date, se você converter
  updatedAt: string // ou Date, se você converter
}

export interface CreateDetentoResponse {
  message: string
  detento: Detento
}

export type infracoes = {
  id?: string
  dataInfracao?: string
  detentoId: string
  descricao: string
}
