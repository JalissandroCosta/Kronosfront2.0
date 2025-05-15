import { CreateDetentoResponse } from '@/@types'
import { POSTTransferPrisioner } from '@/actions/transfer'
import { useMutation, useQueryClient } from '@tanstack/react-query'

type trasnferPrisionerProps ={
  detentoId: string
  celaDestinoId: string
}

const trasnferPrisioner = async (data: trasnferPrisionerProps) => {
  const { detentoId, celaDestinoId} = data
  const { detento }: CreateDetentoResponse = await POSTTransferPrisioner(detentoId,celaDestinoId)
  
  return detento
}


export function usePrisionerMutate() {
  const queryClient = useQueryClient()
  const trasnferPrisionerMutate = useMutation({
    mutationFn: trasnferPrisioner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prisioners-celas'] })
    }
  })

  return { trasnferPrisionerMutate }
}
