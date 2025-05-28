import { POSTVisita, PUTVisita } from '@/actions/visitas'

import { useMutation, useQueryClient } from '@tanstack/react-query'

type AddVisitaProps = {
  detentoId: string
  visitanteId: string
}

const addVisita = async (props: AddVisitaProps) => {
  const visita = await POSTVisita(props)
  return visita
}

type PutVisitaProps = {
  id: string
}

const putVisita = async ({ id }: PutVisitaProps) => {
  const visita = await PUTVisita(id)
  return visita
}

export function useVisitaMutate() {
  const queryClient = useQueryClient()

  const AddVisitaMutate = useMutation({
    mutationFn: addVisita,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['visitas'] })
    }
  })

    const PutVisitaMutate = useMutation({
      mutationFn: putVisita,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['visitas'] })
      }
    })

  return { AddVisitaMutate,PutVisitaMutate }
}
