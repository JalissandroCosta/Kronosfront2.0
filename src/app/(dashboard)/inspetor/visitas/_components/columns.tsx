'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Visita } from '@/@types'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { useVisitaMutate } from '@/hooks/visitas/useVisitasMutate'
import { Timer } from 'lucide-react'
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
              src={foto === null  ? '/default.png' : foto}
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
    header: 'Inicio',
    cell: ({ row }) => {
      const date = new Date(row.getValue('dataVisita'))
      const dataFormatada = date.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })

      const horaFormatada = date.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      })

      return (
        <div className='flex flex-col gap-1'>
          <span>{dataFormatada}</span>
          <span className='text-center'>{horaFormatada}</span>
        </div>
      )
    }
  },
  {
    accessorKey: 'dataVisitaFim',
    header: 'Fim',
    cell: ({ row }) => {
      const date = new Date(row.getValue('dataVisitaFim'))

      if(date.toString() == 'Wed Dec 31 1969 20:00:00 GMT-0400 (Hora padrão do Amazonas)'  || date.toString() === 'Wed Dec 31 1969 20:00:00 GMT-0400 (Amazon Standard Time)'){
        return(
          <div className=''>
            <Timer/>
          </div>
        )
      }
      const dataFormatada = date.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })

      const horaFormatada = date.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      })

      return (
        <div className='flex flex-col gap-1'>
          <span>{dataFormatada}</span>
          <span className='text-center'>{horaFormatada}</span>
        </div>
      )
    }
  },
  {
    accessorKey: 'Ações',
    header: ()=>{
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

  const isSaida = date.toString() == 'Wed Dec 31 1969 20:00:00 GMT-0400 (Hora padrão do Amazonas)'  || date.toString() === 'Wed Dec 31 1969 20:00:00 GMT-0400 (Amazon Standard Time)'

  return (
    <div className="flex gap-2 ml-3">
      <Button variant={'secondary'} onClick={()=>handleEdit()} disabled={!isSaida}>Saida</Button>
       {/*<Button variant={'destructive'}>Excluir</Button>*/}
    </div>
  )
}
