'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Visita } from '@/@types'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { useVisitaMutate } from '@/hooks/visitas/useVisitasMutate'
import Image from 'next/image'

export const columns: ColumnDef<Visita>[] = [
  {
    accessorKey: 'foto',
    header: 'Foto',
    cell: ({ row }) => {
      const foto = row.original.visitante?.foto
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
    header: 'D/H Entrada',
    cell: ({ row }) => {
      const date = new Date(row.getValue('dataVisita'))
      const dataFormatada = date.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })

      const horaFormatada = date.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
      })

      return (
        <div className="flex flex-col gap-1">
          <span>{dataFormatada}</span>
          <span className="text-center">{horaFormatada}</span>
        </div>
      )
    }
  },
  {
    accessorKey: 'dataVisitaFim',
    header: 'D/H Saída',
    cell: ({ row }) => {
      const date = new Date(row.getValue('dataVisitaFim'))
      const isSaida =
        !row.getValue('dataVisitaFim') ||
        isNaN(date.getTime()) ||
        date.getTime() === 0

      if (isSaida) {
        return (
          <div className="flex flex-col items-center justify-center">
            <span className="text-red-500">Aguardando </span>
            <span className="text-red-500">Saída</span>
            {/* <Timer/> */}
          </div>
        )
      }
      const dataFormatada = date.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })

      const horaFormatada = date.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
      })

      return (
        <div className="flex flex-col gap-1">
          <span>{dataFormatada}</span>
          <span className="text-center">{horaFormatada}</span>
        </div>
      )
    }
  },
  {
    accessorKey: 'Ações',
    header: () => {
      return <span className="w-full text-center">Ações</span>
    },
    cell: ({ row }) => <ActionCell row={row} />
  }
]

// Novo componente extraído
function ActionCell({ row }: { row: { original: Visita } }) {
  // const [openEditDialog, setOpenEditDialog] = useState(false)
  // const { id, nome } = row.original
  const visita = row.original as Visita
  const { success, warning } = useToast()
  const { PutVisitaMutate } = useVisitaMutate()

  const handleEdit = () => {
    PutVisitaMutate.mutate(
      {
        id: visita.id
      },
      {
        onSuccess: () => {
          success({
            title: 'Visita atualizada com sucesso',
            description: `O visitante  foi adicionado com sucesso.`
          })
        },
        onError: () => {
          warning({
            title: 'Erro ao atualizar visita',
            description: 'Ocorreu um erro ao atualizar o visita.'
          })
        }
      }
    )
  }

  const date = new Date(row.original.dataVisitaFim)

  const isSaida =
    !row.original.dataVisitaFim || isNaN(date.getTime()) || date.getTime() === 0

  return (
    <div className="ml-3 flex gap-2">
      <Button
        variant={'secondary'}
        onClick={() => handleEdit()}
        disabled={!isSaida}
      >
        Saida
      </Button>
      {/*<Button variant={'destructive'}>Excluir</Button>*/}
    </div>
  )
}
