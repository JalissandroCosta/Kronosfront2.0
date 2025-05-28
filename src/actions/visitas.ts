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

export async function getAllVisitas() {
  const { token } = await getUser()

  const response = await handleRequest('visits/', token, 'GET VISITAS')

  return response
}

type POSTVisitaProps = {
  detentoId: string
  visitanteId: string
}

export async function POSTVisita(props: POSTVisitaProps) {
  const { token } = await getUser()

  try {
    const { data } = await api.post(
      'visits/',
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
        `Failed to fetch POST CADASTRO VISITA from API: ${error.response?.data || error.message}`
      )
    }
    if (error instanceof Error) {
      throw new Error(
        `Failed to fetch POST CADASTRO VISITA from API: ${error.message}`
      )
    }
    throw new Error('POST CADASTRO VISITA.')
  }
}

export async function PUTVisita(id:string,dataVisit:any) {
  const { token } = await getUser()

  try {
    const { data } = await api.put(
      `visits/10df980e-6bc3-4650-9d1a-d69ee7b197eb`,
     
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
        `Failed to fetch PUT EDITAR VISITA from API: ${error.response?.data || error.message}`
      )
    }
    if (error instanceof Error) {
      throw new Error(
        `Failed to fetch PUT EDITAR VISITA from API: ${error.message}`
      )
    }
    throw new Error('PUT EDITAR VISITA.')
  }
}
