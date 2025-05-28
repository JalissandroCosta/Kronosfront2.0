'use client'
import { User } from '@/@types'
import { useUserData } from '@/hooks/user/useUserData'
import { useState } from 'react'
import { TableClient } from './_components/table-client'

export default function PageUsuarios() {
  const { data } = useUserData() as { data: User[] | undefined }
  const [open, setOpen] = useState(false)

  return (
    <section className="flex w-full flex-col items-center justify-center gap-3 p-4">
      <div className="flex w-full">
        <h2 className="text-2xl font-bold uppercase">Lista de Usuáios</h2>
      </div>
      <TableClient data={data} open={open} setOpen={setOpen} />
    </section>
  )
}
