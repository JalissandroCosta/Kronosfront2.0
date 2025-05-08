'use client'

import type React from 'react'

import { handleLogin } from '@/actions/login'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type handleLoginProps = {
  auth: boolean
  message?: string
  userRole?: string
}

export default function LoginScreen() {
  const { success, warning } = useToast()
  const router = useRouter()

  const [cpf, setCpf] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const response: handleLoginProps = await handleLogin(cpf, password)
    console.log(response)
    if (!response.auth) {
      warning({
        title: `${response.message}`
      })

      return
    }

    success({
      title: 'Usuário Autenticado com Sucesso'
    })

    
    if (response.userRole === 'ADM') router.push('/administrador')
    if (response.userRole === 'INSP') router.push('/inspetor')
    if (response.userRole === 'DIR') router.push('/diretor')
    // if (response.tipo === 'R') router.push('/responsavel')
    // router.push('/dashboard')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Entre com seu email e senha para acessar sua conta
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">CPF</Label>
              <Input
                id="cpf"
                placeholder="Infomrme seu CPF"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="*********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-0 right-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {showPassword ? 'Esconder senha' : 'Mostrar senha'}
                  </span>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-end">
              <Button variant="link" className="px-0 font-normal" type="button">
                Esqueceu sua senha?
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit">
              Entrar
            </Button>
          </CardFooter>
        </form>
        <div className="px-8 pb-6 text-center text-sm">
          Não tem uma conta?{' '}
          <Button variant="link" className="px-1 font-normal" type="button">
            Cadastre-se
          </Button>
        </div>
      </Card>
    </div>
  )
}
