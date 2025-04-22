import { Prisioner } from '@/@types'
import { DELETEPrisioner, POSTPrisioner, PUTPrisioner } from '@/actions/prisioner'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const addPrisioner = async (data: Prisioner) => {
  const prisioners = await POSTPrisioner(data)
  return prisioners
}

const putPrisioner = async (data: Prisioner) => {
  const prisioners = await PUTPrisioner(data)
  return prisioners
}

const delPrisioner = async (id: string) => {
  const prisioners = await DELETEPrisioner(id)
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
  const DelPrisionerMutate = useMutation({
    mutationFn: delPrisioner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prisioners'] })
    }
  })
  return { AddPrisionerMutate, PutPrisionerMutate, DelPrisionerMutate }
}
