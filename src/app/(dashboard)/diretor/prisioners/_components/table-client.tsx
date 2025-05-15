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

export const TableClient = ({ data, open, setOpen }: TableClientProps) => {
  return (
    <DataTable
      columns={columns as ColumnDef<Prisioner, unknown>[]}
      data={data || []}
      search
      button={
        <AddPrisionerDialog open={open} setOpen={setOpen}>
          <Button variant="outline" className="ml-auto">
            Adicionar Prisioneiro
          </Button>
        </AddPrisionerDialog>
      }
    />
  )
}
