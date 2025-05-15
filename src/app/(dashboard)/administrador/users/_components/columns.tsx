'use client'

import { User } from '@/@types'
import { ColumnDef } from '@tanstack/react-table'

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
  }

  // {
  //   accessorKey: 'Ações',
  //   cell: ({ row }) => <ActionCell row={row} />
  // }
]

// Novo componente extraído
// function ActionCell({ row }: { row: { original: Prisioner } }) {
//   const [openEditDialog, setOpenEditDialog] = useState(false)
//   const { id, nome } = row.original

//   return (
//     <div className="flex gap-2">
//       {/* <EditPrisionerDialog
//         data={row.original}
//         open={openEditDialog}
//         setOpen={setOpenEditDialog}
//       >
//         <Button variant={'secondary'}>Editar</Button>
//       </EditPrisionerDialog>
//       <DeletePrisionerDialog data={{ id, nome }}>
//         <Button variant={'destructive'}>Excluir</Button>
//       </DeletePrisionerDialog> */}
//     </div>
//   )
// }
