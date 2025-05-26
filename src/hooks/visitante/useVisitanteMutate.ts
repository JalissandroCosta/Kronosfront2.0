import { Visitante } from '@/@types'
import { POSTVisitante } from '@/actions/visitante'

import { useMutation, useQueryClient } from '@tanstack/react-query'

const addVisitante = async (data: Visitante) => {
  const Visitantes = await POSTVisitante(data)
  return Visitantes
}


export function useVisitanteMutate() {
  const queryClient = useQueryClient()
  const AddVisitanteMutate = useMutation({
    mutationFn: addVisitante,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['visitantes'] })
    }
  })

  return { AddVisitanteMutate }
}
