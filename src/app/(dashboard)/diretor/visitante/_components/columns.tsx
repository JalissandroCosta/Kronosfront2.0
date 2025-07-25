'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Prisioner, Visitante } from '@/@types'
import Image from 'next/image'
import { useState } from 'react'

export const columns: ColumnDef<Visitante>[] = [
  {
    accessorKey: 'foto',
    header: 'Foto',
    cell: ({ row }) => {
      const foto = row.original.foto!
      return (
        <div className="h-10 w-10 overflow-hidden rounded-full">
          <Image
            src={foto === null ? '/default.png' : foto}
            width={100}
            height={100}
            alt="Foto do prisioneiro"
            className="h-full w-full object-cover"
          />
        </div>
      )
    }
  },
  {
    accessorKey: 'nome',
    header: 'Nome'
  },
  {
    accessorKey: 'cpf',
    header: 'CPF'
  },
  {
    accessorKey: 'grauParentesco',
    header: 'Parentesco'
  },
  {
    header: 'Detento Vinculado',
    cell: ({ row }) => {
      const detento = (row.original as any).detento
      return detento?.nome ?? 'N/A'
    }
  }
  // {
  //   accessorKey: 'createdAt',
  //   header: 'Data de Criação',
  //   cell: ({ row }) => {
  //     const date = new Date(row.getValue('createdAt'))
  //     return date.toLocaleDateString('pt-BR', {
  //       year: 'numeric',
  //       month: '2-digit',
  //       day: '2-digit'
  //     })
  //   }
  // },
  // {
  //   accessorKey: 'updatedAt',
  //   header: 'Data de Atualização',
  //   cell: ({ row }) => {
  //     const date = new Date(row.getValue('updatedAt'))
  //     return date.toLocaleDateString('pt-BR', {
  //       year: 'numeric',
  //       month: '2-digit',
  //       day: '2-digit'
  //     })
  //   }
  // },
  // {
  //   accessorKey: 'Ações',
  //   cell: ({ row }) => <ActionCell row={row} />
  // }
]

// Novo componente extraído
function ActionCell({ row }: { row: { original: Prisioner } }) {
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const { id, nome } = row.original

  return (
    <div className="flex gap-2">
      {/* <EditPrisionerDialog
        data={{
          ...row.original,
          alocacoes: (row.original as any).alocacoes || []
        }}
        open={openEditDialog}
        setOpen={setOpenEditDialog}
      >
        <Button variant={'secondary'}>Editar</Button>
      </EditPrisionerDialog>
      <DeletePrisionerDialog data={{ id, nome }}>
        <Button variant={'destructive'}>Excluir</Button>
      </DeletePrisionerDialog> */}
    </div>
  )
}
