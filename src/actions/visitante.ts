'use server'

import { Visita, Visitante } from '@/@types'
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

export async function getAllVisitante(): Promise<Visitante[]> {
  const { token } = await getUser()

  return await handleRequest('visit/', token, 'GET VISITANTES')
}
export async function POSTVisitante(props: Visitante) {
  const { token } = await getUser()

  const { nome, grauParentesco, cpf, idDetento,  } = props
  try {
    const { data } = await api.post(
      'visit/',
      {
        id: props.id,
        nome,
        grauParentesco, 
        cpf,
        idDetento,
        
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
        `Failed to fetch POST CADASTRO VISITANTE from API: ${error.response?.data || error.message}`
      )
    }
    if (error instanceof Error) {
      throw new Error(
        `Failed to fetch POST CADASTRO VISITANTE from API: ${error.message}`
      )
    }
    throw new Error('POST CADASTRO VISITANTE.')
  }
}