'use server'

import { api } from '@/services/api'
import { getUser } from '@/utils/get-users'
import { AxiosError } from 'axios'


export async function POSTTransferPrisioner( detentoId: string,celaDestinoId: string) {
  const { token } = await getUser()

  try {
    const { data } = await api.post(
      'transfer/',
      {
       detentoId,
        celaDestinoId
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
        `Failed to fetch POST TRANSFERENCIA DE PRISIONEIRO from API: ${error.response?.data || error.message}`
      )
    }
    if (error instanceof Error) {
      throw new Error(
        `Failed to fetch POST TRANSFERENCIA DE PRISIONEIRO from API: ${error.message}`
      )
    }
    throw new Error('POST TRANSFERENCIA DE PRISIONEIRO.')
  }
}


