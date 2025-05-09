'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useState } from 'react'
import { ShowPrisionerDialog } from './show-prisioner'

export type Prisioner = {
  id: string
  nome: string
  idade: number
  cpf: string
  filiacao: string
  estadoCivil: 'Solteiro' | 'Casado' | 'Divorciado'
  foto: string
  reincidencia: boolean
  createdAt: string // ISO Date string
  updatedAt: string // ISO Date string
}

export const columns: ColumnDef<Prisioner>[] = [
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
  const { id, nome } = row.original

  return (
    <div className="flex gap-2">
      <ShowPrisionerDialog
        data={row.original}
        open={openEditDialog}
        setOpen={setOpenEditDialog}
      >
        <Button variant={'secondary'}>Mostrar</Button>
      </ShowPrisionerDialog>
    </div>
  )
}
