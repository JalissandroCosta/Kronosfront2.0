import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

type DataProps = {
  codigo: number
  tipo: 'P' | 'R'
  nome: string
  hash: string
  email: string
  msg: string
  token: string
}

export type IUser = DataProps

export async function getUser() {
  const cookieStore = await cookies()
  const data = cookieStore.get('app-auth-token')


  if (!data) {
    return {} as IUser
  }

  const decode = jwt.decode(data.value) as IUser

  return {
    ...decode,
    token: data.value
  }
}
