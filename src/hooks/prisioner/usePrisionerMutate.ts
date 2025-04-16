import { Prisioner } from '@/@types'
import { POSTPrisioner, PUTPrisioner } from '@/actions/prisioner'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const addPrisioner = async (data: Prisioner) => {
  const prisioners = await POSTPrisioner(data)
  return prisioners
}

const putPrisioner = async (data: Prisioner) => {
  const prisioners = await PUTPrisioner(data)
  return prisioners
}

export function usePrisionerMutate() {
  const queryClient = useQueryClient()
  const AddPrisionerMutate = useMutation({
    mutationFn: addPrisioner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prisioners'] })
    }
  })
  const PutPrisionerMutate = useMutation({
    mutationFn: putPrisioner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prisioners'] })
    }
  })
  return { AddPrisionerMutate, PutPrisionerMutate }
}
