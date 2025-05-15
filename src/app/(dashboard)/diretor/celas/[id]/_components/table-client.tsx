import { PrisionerCela } from '@/@types'
import { DataTable } from '@/components/table/data-table'
import { ColumnDef } from '@tanstack/react-table'
// import { AddPrisionerDialog } from './add-prisioner'
import { columns } from './columns'

type TableClientProps = {
  data: PrisionerCela[] | undefined
  open?: boolean
  setOpen?: (open: boolean) => void
}

export const TableClient = ({ data }: TableClientProps) => {
  return (
    <DataTable
      columns={columns as ColumnDef<PrisionerCela, unknown>[]}
      data={data || []}
      search
      placeholderSearch="Digite o nome do prisioneiro"
    />
  )
}
