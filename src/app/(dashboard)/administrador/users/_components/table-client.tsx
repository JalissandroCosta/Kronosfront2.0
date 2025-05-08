import { User } from '@/@types'
import { DataTable } from '@/components/table/data-table'
import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'

import { AddUserDialog } from './add-user'
import { columns } from './columns'

type TableClientProps = {
  data: User[] | undefined
  open?: boolean
  setOpen?: (open: boolean) => void
}

export const TableClient = ({ data, open, setOpen }: TableClientProps) => {
  return (
    <DataTable
      columns={columns as ColumnDef<User, unknown>[]}
      data={data || []}
      search={'nome'}
      button={
        <AddUserDialog open={open} setOpen={setOpen}>
          <Button variant="outline" className="ml-auto">
            Adicionar Usuario
          </Button>
        </AddUserDialog>
      }
    />
  )
}
