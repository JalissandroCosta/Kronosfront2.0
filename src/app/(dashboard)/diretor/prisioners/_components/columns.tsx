'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Alocacao, infracoes, Prisioner } from '@/@types'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import { EditPrisionerDialog } from './edite-prisioner'

export const columns: ColumnDef<
  Prisioner & { alocacoes: Alocacao[]; infracoes: infracoes[] }
>[] = [
  {
    accessorKey: 'foto',
    header: 'Foto',
    cell: ({ row }) => {
      const foto = row.original.foto
      return (
        <div className="h-10 w-10 overflow-hidden rounded-full">
          <Image
            src={foto == 'string' ? '/default.png' : foto}
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
    accessorKey: 'infracoes',
    header: 'Infrações',
    cell: ({ row }) => {
      const numeroDeInfracoes = row.original.infracoes
      return (
        <div className="flex h-full w-full items-center justify-center">
          {numeroDeInfracoes.length}
        </div>
      )
    }
  },
  {
    accessorKey: 'createdAt',
    header: 'Data de Criação',
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'))
      return date.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })
    }
  },
  {
    accessorKey: 'updatedAt',
    header: 'Data de Atualização',
    cell: ({ row }) => {
      const date = new Date(row.getValue('updatedAt'))
      return date.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })
    }
  },
  {
    accessorKey: 'Ações',
    cell: ({ row }) => <ActionCell row={row} />
  }
]

// Novo componente extraído
function ActionCell({ row }: { row: { original: Prisioner } }) {
  const [openEditDialog, setOpenEditDialog] = useState(false)

  const dataMemo = useMemo(
    () => ({
      ...row.original,
      alocacoes: (row.original as any).alocacoes || [],
      infractions: (row.original as any).infracoes || []
    }),
    [row.original]
  )

  const { id, nome } = row.original

  return (
    <div className="flex gap-2">
      <EditPrisionerDialog
        data={dataMemo}
        open={openEditDialog}
        setOpen={setOpenEditDialog}
      >
        <Button variant={'secondary'}>Editar</Button>
      </EditPrisionerDialog>

    </div>
  )
}
