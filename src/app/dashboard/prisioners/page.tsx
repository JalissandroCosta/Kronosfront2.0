'use client'


import { usePrisionerData } from '@/hooks/prisioner/usePrisionerData'
import { useState } from 'react'
import { TableClient } from './_components/table-client'

export default function PagePrisioner() {
  const { data } = usePrisionerData()
  const [open, setOpen] = useState(false)

  // const allPrisioners = await getAllPrisioners()
  return (
    <section className="flex w-full flex-col items-center justify-center gap-3 p-4">
      <div className="flex w-full">
        <h2 className="text-2xl font-bold uppercase">Lista de Prisioneiros</h2>
      </div>
      <TableClient data={data} open={open} setOpen={setOpen} />
    </section>
  )
}
