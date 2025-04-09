'use server'

import { api } from '@/services/api'
import type { AxiosError } from 'axios'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

interface LoginResponse {
  auth: boolean
  message: string
}

// Função para tratar erros de autenticação
const handleAuthError = (error: AxiosError): LoginResponse => {
  if (error.response) {
    // Se o erro for uma resposta do servidor, podemos acessar os dados do erro
    console.error('Erro de autenticação:', error.response.data || error.message)
  } else {
    // Se o erro não for de resposta (por exemplo, erro de rede), logamos o erro
    console.error('Erro desconhecido de autenticação:', error.message)
  }

  return {
    auth: false,
    message: 'Falha na execução do login. Entre em contato com o suporte.'
  }
}

export async function handleLogin(cpf: string, senha: string) {
  const defaultErrorMessage = {
    auth: false,
    message: 'Usuário ou senha incorretos'
  }

  try {
    const { data } = await api.post('/login/', { cpf, senha })

    // Verificando se o token foi retornado
    if (!data.token) {
      return defaultErrorMessage
    }

    // Salvando o token no cookie
    const cookieStore = await cookies();
    cookieStore.set({
      name: 'app-auth-token',
      value: data.token,
      httpOnly: true,
      path: '/',
      maxAge: 24 * 60 * 60
    })

    // Extraindo o "role" do token (se existir) para definir o tipo de usuário
    const payload = JSON.parse(atob(data.token.split('.')[1]))
    // const userRole = payload?.tipo

    return {
      auth: true,
      message: 'Login realizado com sucesso',
    }
  } catch (error) {
    return handleAuthError(error as AxiosError)
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('app-auth-token')
  redirect('/login')
}