'use client'

import { getInfoCela, getInfoCelaResponse } from '@/actions/celas'
import { usePrisionerCellData } from '@/hooks/celas/useCelasData'
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
      <h1 className="text-2xl font-bold">Cela ID - {cela?.numero}</h1>
      <p className="text-muted-foreground text-sm">
        Aqui você pode visualizar os detalhes da cela.
      </p>

      <TableClient data={data} />
    </div>
  )
}
