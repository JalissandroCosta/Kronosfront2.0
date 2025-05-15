'use client'

import { PrisionerCela } from '@/@types'
import { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { TransferPrisionerDialog } from '../../_components/transfer-prisioner'
// import { DeletePrisionerDialog } from './delete-prisioner'
// import { EditPrisionerDialog } from './edite-prisioner'

type presosAlocados = {
  id: string
  detentoId: string
  celaId: string
  dataAlocacao: string
  nome: string
  cpf: string
  foto: string
}

export const columns: ColumnDef<PrisionerCela>[] = [
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
    accessorKey: 'updatedAt',
    header: 'Data Alocação',
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
function ActionCell({ row }: { row: { original: PrisionerCela } }) {
  const [openEditDialog, setOpenEditDialog] = useState(false)
  // const { id, nome } = row.original
  //  console.log(row.original)

  return (
    <div className="flex gap-2">
      <TransferPrisionerDialog
        {...row.original}
        open={openEditDialog}
        setOpen={setOpenEditDialog}
      >
        <Button variant={'secondary'}>Transferir</Button>
      </TransferPrisionerDialog>
      {/* <DeletePrisionerDialog data={{ id, nome }}>
        <Button variant={'destructive'}>Excluir</Button>
      </DeletePrisionerDialog> */}
    </div>
  )
}
