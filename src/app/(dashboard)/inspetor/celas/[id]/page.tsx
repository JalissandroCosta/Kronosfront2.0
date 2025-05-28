'use client'

import { getInfoCela, getInfoCelaResponse } from '@/actions/celas'
import { ButtonBack } from '@/components/button-back'
import { usePrisionerCellData } from '@/hooks/celas/usePrisionerCelasData'
import { use, useEffect, useState } from 'react'
import { TableClient } from './_components/table-client'

type paramsProps = {
  params: {
    id: string
  }
}

export default function CelaIDPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const [cela, setCela] = useState<getInfoCelaResponse>()
  const { id } = use(params)

  const { data } = usePrisionerCellData(id)

  useEffect(() => {
    const fetchdata = async () => {
      const data = await getInfoCela(id)
      setCela(data)
    }
    fetchdata()
  }, [id, setCela])

  return (
    <div>
      <div className="mb-2 flex gap-4">
        <ButtonBack />
        <h1 className="text-2xl font-bold">Cela Nº - {cela?.numero}</h1>
      </div>
      <p className="text-muted-foreground text-sm">
        Aqui você pode visualizar os detalhes da cela.
      </p>

      <TableClient data={data} />
    </div>
  )
}
