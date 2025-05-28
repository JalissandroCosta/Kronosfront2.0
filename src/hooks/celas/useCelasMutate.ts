import { POSTCell } from '@/actions/celas'
import { useMutation, useQueryClient } from '@tanstack/react-query'

type AddCelaProps = {
  numero: number
  capacidade: number
  pavilhao: string
}
const addCela = async (data: AddCelaProps) => {
  const cela = await POSTCell(data)
  return cela
}

export function useCelaMutate() {
  const queryClient = useQueryClient()
  // Mutate function to add a new cell
  const AddCelaMutate = useMutation({
    mutationFn: addCela,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['celas'] })
    }
  })

  return { AddCelaMutate }
}
