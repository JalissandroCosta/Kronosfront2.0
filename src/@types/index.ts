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
  advogadoId: string
  dataVisita: string // formato ISO string (ex: "2025-02-14T16:18:18.089Z")
  detento: {
    id: string
    nome: string
    idade: number
    cpf: string
    filiacao: string
    estadoCivil: string
    foto: string
    reincidencia: boolean
    createdAt: string
    updatedAt: string
  }
  visitante: {
    id: string
    nome: string
    grauParentesco: string
  }
  Advogado: {
    id: string
    nome: string
    oabNumero: string
  }
}

export type Visitante = {
  id?: string
  nome: string
  grauParentesco: string | undefined // Adicionado grauParentesco como opcional
  cpf: string
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
