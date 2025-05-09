import { CreateDetentoResponse, Prisioner } from '@/@types'
import { POSTInfracao } from '@/actions/infracoes'
import {
  CreateAlocacaoResponse,
  DELETEPrisioner,
  POSTPrisioner,
  POSTPrisionerAlocation,
  PUTPrisioner
} from '@/actions/prisioner'
import { useMutation, useQueryClient } from '@tanstack/react-query'


type addPrisionerProps = Prisioner & {
  celaId: string
  infractions: string[]
}

const addPrisioner = async (data:addPrisionerProps) => {
  const {  celaId, infractions ,...rest } = data
  const {detento }:CreateDetentoResponse = await POSTPrisioner(rest)
  infractions.map(async (infracao) => await POSTInfracao(detento.id, infracao))
  const alocacao:CreateAlocacaoResponse = await POSTPrisionerAlocation(celaId,detento.id)
 
  return detento
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
