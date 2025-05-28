'use client'

import { User } from '@/@types'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { useUserMutate } from '@/hooks/user/useUserMutate'
import { ColumnDef } from '@tanstack/react-table'
import { useState } from 'react'

// export type Prisioner = {
//   id: string
//   nome: string
//   idade: number
//   cpf: string
//   filiacao: string
//   estadoCivil: 'Solteiro' | 'Casado' | 'Divorciado'
//   foto: string
//   reincidencia: boolean
//   createdAt: string // ISO Date string
//   updatedAt: string // ISO Date string
// }

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'nome',
    header: 'Nome'
  },
  {
    accessorKey: 'cpf',
    header: 'CPF'
  },
  {
    accessorKey: 'cargo',
    header: 'CARGO'
  },
  {
    accessorKey: 'Ações',
    cell: ({ row }) => <ActionCell row={row} />
  }
]

// Novo componente extraído
function ActionCell({ row }: { row: { original: User } }) {
  const [openEditDialog, setOpenEditDialog] = useState(false)
    const { success, warning } = useToast()
  const { id, nome,cpf } = row.original

  const { DelUserMutate } = useUserMutate()

    const handleEdit = () => {
   
      DelUserMutate.mutate(
      cpf,
      {
        onSuccess: () => {
         
          success({
            title: 'Usuario deletado com sucesso',
            description: `Usuario deletado com sucesso.`
          })
        
        },
        onError: () => {
          warning({
            title: 'Erro ao deletar usuario ',
            description: 'Ocorreu um erro ao atualizar o deletar o usuario.'
          })
        }
      }
    )

  }

  return (
    <div className="flex gap-2">
      {/* <EditPrisionerDialog
        data={row.original}
        open={openEditDialog}
        setOpen={setOpenEditDialog}
      >
        <Button variant={'secondary'}>Editar</Button>
      </EditPrisionerDialog>*/}
      <Button 
      variant={'destructive'}
      onClick={()=>handleEdit()}
      >Excluir</Button>
    </div>
  )
}
