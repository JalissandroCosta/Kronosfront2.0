import { DELETUser, POSTUser } from '@/actions/user'
import { useMutation, useQueryClient } from '@tanstack/react-query'

type User = {
  nome: string
  cpf: string
  cargo: string
  senha: string
  nivelPermissao: number
}
const addUser = async (data: User) => {
  const user = await POSTUser(data)
  return user
}

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

  const AddUserMutate = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })
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
  return { DelUserMutate, AddUserMutate }
}
