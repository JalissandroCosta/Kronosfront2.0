'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Visita } from '@/@types'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export const columns: ColumnDef<Visita>[] = [

  {
    accessorKey: 'visitante.nome',
    header: 'Visitante'
  },

  {
    accessorKey: 'visitante.grauParentesco',
    header: 'Parentesco'
  },
    {
    accessorKey: 'detento.foto',
    header: 'Foto',
    cell: ({ row }) => {
      const foto = row.original.detento?.foto || 'string'
      return (
        <div className="h-10 w-10 overflow-hidden rounded-4xl">
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
    header: 'Detento',
    cell: ({ row }) => {
      const detento = (row.original as any).detento
      return detento?.nome ?? 'N/A'
    }
  },
  {
    accessorKey: 'dataVisita',
    header: 'Data da Visita',
    cell: ({ row }) => {
      const date = new Date(row.getValue('dataVisita'))
      return date.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })
    }
  },
  {
    accessorKey: 'Ações',
    cell: ({ row }) => {
      return(
       <div className="flex gap-2">
      <Button variant={'secondary'}>Editar</Button>
      <Button variant={'destructive'}>Excluir</Button>
    </div> 
      )
    }
  }
]

// Novo componente extraído
function ActionCell({ row }: { row: { original: Visita } }) {
  // const [openEditDialog, setOpenEditDialog] = useState(false)
  // const { id, nome } = row.original

  return (
    <div className="flex gap-2">
      <Button variant={'secondary'}>Editar</Button>
      <Button variant={'destructive'}>Excluir</Button>
    </div>
  )
}
