import { Visitante } from '@/@types'
import { DataTable } from '@/components/table/data-table'
import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { columns } from './coluna'
import { AddVisitanteDialog } from './add-visitante'

// import { AddUserDialog } from './add-user'


type TableClientProps = {
  data: Visitante[] | undefined
  open?: boolean
  setOpen?: (open: boolean) => void
}

export const TableClient = ({ data, open, setOpen }: TableClientProps) => {
  return (
    <DataTable
      columns={columns as ColumnDef<Visitante, unknown>[]}
      data={data || []}
      search={'nome'}
      button={
        <AddVisitanteDialog open={open} setOpen={setOpen}>
          <Button variant="outline" className="ml-auto">
            Adicionar visitante
          </Button>
        </AddVisitanteDialog>
      }
    />
  )
}
