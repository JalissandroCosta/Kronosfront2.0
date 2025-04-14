'use server'

import { Prisioner } from '@/@types'
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

// GET DE TODOS OS ALUNOS DO RESPONSÁVEL
export async function getAllPrisioners() {
  const { token } = await getUser()

  return await handleRequest('prisoner/', token, 'GET PRISIONERS')
}

export async function PUTPrisioner(props: Prisioner) {
  const { token } = await getUser()
  const { id, createdAt, updatedAt, ...payload } = props

  try {
    const { data } = await api.put(
      `prisoner/${id}`,
      { ...payload },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Cache-Control': 'no-cache'
        }
      }
    )
    console.log(data)
    return data
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(
        `Failed to fetch PUT CADASTRO PRISIONEIRO from API: ${error.response?.data || error.message}`
      )
    }
    if (error instanceof Error) {
      throw new Error(
        `Failed to fetch PUT CADASTRO PRISIONEIRO from API: ${error.message}`
      )
    }
    throw new Error('PUT CADASTRO PRISIONEIRO.')
  }
}

export async function POSTPrisioner(props: Prisioner) {
  const { token } = await getUser()

  const { id, createdAt, updatedAt, ...payload } = props
  try {
    const { data } = await api.post(
      'prisoner/',
      {
        ...payload
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
        `Failed to fetch POST CADASTRO PRISIONEIRO from API: ${error.response?.data || error.message}`
      )
    }
    if (error instanceof Error) {
      throw new Error(
        `Failed to fetch POST CADASTRO PRISIONEIRO from API: ${error.message}`
      )
    }
    throw new Error('POST CADASTRO PRISIONEIRO.')
  }
}

export async function DELETEPrisioner(id: string) {
  const { token } = await getUser()
  console.log(id)

  try {
    const { data } = await api.delete(`prisoner/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json'
      }
    })
    console.log(data)
    return data
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(
        `Failed to fetch DELETE CADASTRO PRISIONEIRO from API: ${
          typeof error.response?.data === 'object'
            ? JSON.stringify(error.response.data)
            : error.response?.data || error.message
        }`
      )
    }
    if (error instanceof Error) {
      throw new Error(
        `Failed to fetch DELETE CADASTRO PRISIONEIRO from API: ${error.message}`
      )
    }
    throw new Error('DELETE CADASTRO PRISIONEIRO.')
  }
}
