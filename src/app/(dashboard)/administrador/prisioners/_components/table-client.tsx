import { Prisioner } from '@/@types'
import { DataTable } from '@/components/table/data-table'
import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { AddPrisionerDialog } from './add-prisioner'
import { columns } from './columns'

type TableClientProps = {
  data: Prisioner[] | undefined
  open?: boolean
  setOpen?: (open: boolean) => void
}

type celasDisponiveis=
{
  id: string,
  numero: number,
  capacidade: number,
  pavilhao: string,
  alocacoes: Array<any>
}

export const TableClient =  ({ data, open, setOpen }: TableClientProps) => {
// const allCells:celasDisponiveis[] = await getAllCelas()
// const celasDisponiveis:celasDisponiveis[] = allCells.filter((celas) => celas.alocacoes.length < celas.capacidade)

  return (
    <DataTable
      columns={columns as ColumnDef<Prisioner, unknown>[]}
      data={data || []}
      search={'nome'}
      button={
        <AddPrisionerDialog open={open} setOpen={setOpen} >
          <Button variant="outline" className="ml-auto">
            Adicionar Prisioneiro
          </Button>
        </AddPrisionerDialog>
      }
    />
  )
}
