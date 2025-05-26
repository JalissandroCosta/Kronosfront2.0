import { Visita } from '@/@types'
import { DataTable } from '@/components/table/data-table'
import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { AddVisitaDialog } from './add-visita'
import { columns } from './columns'

type TableClientProps = {
  data: Visita[] | undefined
  open?: boolean
  setOpen?: (open: boolean) => void
}

export const TableClient = ({ data, open, setOpen }: TableClientProps) => {
  return (
    <DataTable
      columns={columns as ColumnDef<Visita, unknown>[]}
      data={data || []}
      search
      button={
        <AddVisitaDialog open={open} setOpen={setOpen}>
          <Button variant="outline" className="ml-auto">
            Registrar Visita
          </Button>
        </AddVisitaDialog>
      }
    />
  )
}
