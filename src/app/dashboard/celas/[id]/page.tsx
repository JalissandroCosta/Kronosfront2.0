'use client'

import { usePrisionerCellData } from '@/hooks/celas/useCelasData'
import { use } from 'react'
import { TableClient } from './_components/table-client'

type paramsProps = {
  params: {
    id: string
  }
}

export default  function CelaIDPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  const { data } = usePrisionerCellData(id)
  
 
  return (
    <div>
      <h1 className="text-2xl font-bold">Cela ID - {id}</h1>
      <p className="text-muted-foreground text-sm">
        Aqui você pode visualizar os detalhes da cela.
      </p>

      <TableClient data={data}/>
    </div>
  )
}
