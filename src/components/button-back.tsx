'use client'

import { Button } from '@/components/ui/button'
import { useHandleBack } from '@/hooks/use-router'


import { ChevronLeft } from 'lucide-react'

export const ButtonBack = () => {
  const handleBack = useHandleBack()
  return (
    <Button
      variant={'outline'}
      onClick={handleBack}
      type="button"
      className="border-none"
      size={'sm'}
    >
      <ChevronLeft /> 
    </Button>
  )
}