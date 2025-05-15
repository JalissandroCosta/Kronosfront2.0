import { Visitante } from '@/@types'
import { POSTVisitante } from '@/actions/visitante'

import { useMutation, useQueryClient } from '@tanstack/react-query'

const addVisitante = async (data: Visitante) => {
  const Visitantes = await POSTVisitante(data)
  return Visitantes
}

// const putVisitante = async (data: Visitante) => {
//   const Visitantes = await PUTVisitante(data)
//   return Visitantes
// }

// const delVisitante = async (id: string) => {
//   const Visitantes = await DELETEVisitante(id)
//   return Visitantes
// }

export function useVisitanteMutate() {
  const queryClient = useQueryClient()
  const AddVisitanteMutate = useMutation({
    mutationFn: addVisitante,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Visitantes'] })
    }
  })
  // const PutVisitanteMutate = useMutation({
  //   mutationFn: putVisitante,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['Visitantes'] })
  //   }
  // })
  // const DelVisitanteMutate = useMutation({
  //   mutationFn: delVisitante,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['Visitantes'] })
  //   }
  // })
  return { AddVisitanteMutate }
}
