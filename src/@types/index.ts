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
  id: string,
  nome: string,
  cpf: string,
  cargo: "ADM" | "INSP",
  nivelPermissao: number
}