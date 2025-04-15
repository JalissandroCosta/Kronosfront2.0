import { Prisioner } from '@/@types'
import { POSTPrisioner } from '@/actions/prisioner'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const ADDPrisioner = async (data: Prisioner) => {
  const prisioners = await await POSTPrisioner(data)
  return prisioners
}

export function usePrisionerMutate() {
  const queryClient = useQueryClient()
  const mutate = useMutation({
    mutationFn: ADDPrisioner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prisioners'] })
    }
  })
  return mutate
}
