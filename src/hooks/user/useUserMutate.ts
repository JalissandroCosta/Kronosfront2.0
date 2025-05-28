import { DELETUser } from '@/actions/user'
import { useMutation, useQueryClient } from '@tanstack/react-query'

// const addPrisioner = async (data: Prisioner) => {
//   const prisioners = await POSTPrisioner(data)
//   return prisioners
// }

// const putPrisioner = async (data: Prisioner) => {
//   const prisioners = await PUTPrisioner(data)
//   return prisioners
// }

const delUser = async (cpf: string) => {
  const user = await DELETUser(cpf)
  return user
}

export function useUserMutate() {
  const queryClient = useQueryClient()

  // const AddPrisionerMutate = useMutation({
  //   mutationFn: addPrisioner,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['prisioners'] })
  //   }
  // })
  // const PutPrisionerMutate = useMutation({
  //   mutationFn: putPrisioner,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['prisioners'] })
  //   }
  // })
  const DelUserMutate = useMutation({
    mutationFn: delUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })
  return { DelUserMutate }
}
