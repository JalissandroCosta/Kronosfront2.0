import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

type DataProps = {
  id: string
  cargo: string
  nome: string
  hash: string
  email: string
  msg: string
  token: string
}

// export type IUser = {
//   id: string
//   cargo: string
//   nome: string
//   email: string
//   iat: number // emitido em (issued at)
//   exp: number // expiração (expiration time)
// }


export type IUser = DataProps

export async function getUser() {
  const cookieStore = await cookies()
  const data = cookieStore.get('app-auth-token')

  if (!data) {
    return {} as IUser
  }

  const decode = jwt.decode(data.value) as IUser
  // console.log("TOKEN DECODE = ", decode)

  return {
    ...decode,
    token: data.value
  }
}
