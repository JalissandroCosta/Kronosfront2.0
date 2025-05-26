import { POSTVisita } from '@/actions/visitas'

import { useMutation, useQueryClient } from '@tanstack/react-query'

type AddVisitaProps = {
  detentoId: string
  visitanteId: string
}

const addVisita = async (props: AddVisitaProps) => {
  const visita = await POSTVisita(props)
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

  return { AddVisitaMutate }
}
