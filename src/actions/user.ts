'use server'

import { api } from '@/services/api'
import { getUser } from '@/utils/get-users'
import { AxiosError } from 'axios'

const handleRequest = async (
  url: string,
  token: string,
  errorMessage: string
) => {
  try {
    const { data } = await api.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: '0'
      }
    })
    return data
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(
        `Failed to fetch ${errorMessage} from API: ${error.response?.data || error.message}`
      )
    }
    if (error instanceof Error) {
      throw new Error(
        `Failed to fetch ${errorMessage} from API: ${error.message}`
      )
    }
    throw new Error('An unknown error occurred.')
  }
}

// GET DE TODOS OS USUSARIOS
export async function getAllUser(): Promise<User[]> {
  const { token } = await getUser()

  return await handleRequest('user/list', token, 'GET USERS')
}

export async function DELETUser(cpf: string) {
  const { token } = await getUser()

  try {
    const { data } = await api.delete(`user/${cpf}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return data
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(
        `Failed to fetch DELETE USUARIO from API: ${
          typeof error.response?.data === 'object'
            ? JSON.stringify(error.response.data)
            : error.response?.data || error.message
        }`
      )
    }
    if (error instanceof Error) {
      throw new Error(
        `Failed to fetch DELETE USUARIO from API: ${error.message}`
      )
    }
    throw new Error('DELETE USUARIO.')
  }
}

type User = {
  nome: string
  cpf: string
  cargo: string
  senha: string
  nivelPermissao: number
}
export async function POSTUser(props: User) {
  const { token } = await getUser()

  try {
    const { data } = await api.post(
      'user/register',
      {
        ...props
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Cache-Control': 'no-cache',
          'Content-Type': 'application/json'
        }
      }
    )

    return data
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(
        `Failed to fetch POST CADASTRO USER from API: ${
          typeof error.response?.data === 'object'
            ? JSON.stringify(error.response.data)
            : error.response?.data || error.message
        }`
      )
    }
    if (error instanceof Error) {
      throw new Error(
        `Failed to fetch POST CADASTRO USER from API: ${error.message}`
      )
    }
    throw new Error('POST CADASTRO USER.')
  }
}
