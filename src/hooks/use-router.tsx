'use client'

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

export const useCustomRouter = () => {
  const router = useRouter()

  const redirectTo = useCallback(
    (url: string) => {
      router.push(url)
    },
    [router]
  )

  return { redirectTo }
}

export const useHandleBack = () => {
  const router = useRouter()

  const handleBack = () => {
    router.back() // Volta para a página anterior
  }

  return handleBack
}
