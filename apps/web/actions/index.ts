"use server"

import { api } from "@/services/api"
import { getUser } from "@/utils/get-users"
import { AxiosError } from "axios"

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

  console.log('token', token)
  return await handleRequest(
    "prisoner/",
    token,
    'GET PRISIONERS'
  )
}

// export async function atualizarDadosProfessor(props: DataProfessor) {
//   const { token }: IUser = getUser()
//   try {
//     const { data } = await api.put(
//       'professor/cadastro',
//       { ...props },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Cache-Control': 'no-cache'
//         }
//       }
//     )
//     return data
//   } catch (error: unknown) {
//     if (error instanceof AxiosError) {
//       throw new Error(
//         `Failed to fetch PUT CADASTRO PROFESSOR from API: ${error.response?.data || error.message}`
//       )
//     }
//     if (error instanceof Error) {
//       throw new Error(
//         `Failed to fetch PUT CADASTRO PROFESSOR from API: ${error.message}`
//       )
//     }
//     throw new Error('An unknown error occurred.')
//   }
// }
// // POST ANEXOS CADASTRO PROFESSOR
// export async function postAnexosDadosProfessor(descricao: string, url: string) {
//   const { token }: IUser = getUser()
//   try {
//     const { data } = await api.post(
//       'professor/anexo/cadastro',
//       {
//         descricao: descricao,
//         url: url
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Cache-Control': 'no-cache',
//           'Content-Type': 'application/json'
//         }
//       }
//     )
//     return data
//   } catch (error: unknown) {
//     if (error instanceof AxiosError) {
//       throw new Error(
//         `Failed to fetch POST ANEXOS CADASTRO PROFESSOR from API: ${error.response?.data || error.message}`
//       )
//     }
//     if (error instanceof Error) {
//       throw new Error(
//         `Failed to fetch POST ANEXOS CADASTRO PROFESSOR from API: ${error.message}`
//       )
//     }
//     throw new Error('POST ANEXOS CADASTRO PROFESSOR.')
//   }
// }
