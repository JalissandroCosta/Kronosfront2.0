import { getAllPrisioners } from '@/actions/prisioner'
import { DataTable } from '@/components/table/data-table'

import { Button } from '@/components/ui/button'
import { AddPrisionerDialog } from './_components/add-prisioner'
import { columns } from './_components/columns'

export default async function PagePrisioner() {
  const allPrisioners = await getAllPrisioners()
  return (
    <section className="flex w-full flex-col items-center justify-center gap-3 p-4">
      <div className="flex w-full">
        <h2 className="text-2xl font-bold uppercase">Lista de Prisioneiros</h2>
      </div>
      <DataTable
        columns={columns}
        data={allPrisioners}
        search={'nome'}
        button={
          <AddPrisionerDialog>
            <Button variant="outline" className="ml-auto">
              Adicionar Prisioneiro
            </Button>
          </AddPrisionerDialog>
        }
      />
    </section>
  )
}
