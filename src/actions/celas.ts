'use server'

import { Cela, PrisionerCela } from '@/@types'
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

export async function getAllCelas(): Promise<Cela[]> {
  const { token } = await getUser()

  return await handleRequest('cell/', token, 'GET CELAS')
}

export async function getAllPrisionersCelas(
  idCell: string
): Promise<PrisionerCela[]> {
  const { token } = await getUser()

  return await handleRequest(
    `cell/${idCell}`,
    token,
    'GET PRISIONEIROS DA CELA'
  )
}
