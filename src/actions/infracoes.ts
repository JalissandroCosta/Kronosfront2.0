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

export async function POSTInfracao(detentoId: string, descricao: string) {
  const { token } = await getUser()

  try {
    const { data } = await api.post(
      'infringement/',
      {
        detentoId,
        descricao
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
        `Failed to fetch POST CADASTRO INFRAÇÃO PRISIONEIRO from API: ${error.response?.data || error.message}`
      )
    }
    if (error instanceof Error) {
      throw new Error(
        `Failed to fetch POST CADASTRO INFRAÇÃO PRISIONEIRO from API: ${error.message}`
      )
    }
    throw new Error('POST CADASTRO INFRAÇÃO PRISIONEIRO.')
  }
}

export async function DELETEInfracao(id: string) {
  const { token } = await getUser()

  try {
    const { data } = await api.delete(`infringement/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return data
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(
        `Failed to fetch DELETE INFRACAO from API: ${
          typeof error.response?.data === 'object'
            ? JSON.stringify(error.response.data)
            : error.response?.data || error.message
        }`
      )
    }
    if (error instanceof Error) {
      throw new Error(
        `Failed to fetch DELETE INFRACAO from API: ${error.message}`
      )
    }
    throw new Error('DELETE INFRACAO.')
  }
}

// export async function getAllInfracoes(): Promise<Cela[]> {
//   const { token } = await getUser()

//   return await handleRequest('cell/', token, 'GET CELAS')
// }
