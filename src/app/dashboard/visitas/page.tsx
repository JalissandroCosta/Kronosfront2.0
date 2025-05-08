'use client'
import { useVisitanteData } from "@/hooks/visitante/useVisitanteData";
import { TableClient } from "./_componentes/table-client";


export default function PageVisitas() {

     const { data } = useVisitanteData()
      // const [open, setOpen] = useState(false)

  return (
     <section className="flex w-full flex-col items-center justify-center gap-3 p-4">
          <div className="flex w-full">
            <h2 className="text-2xl font-bold uppercase">Lista de Visitantes</h2>
          </div>
          <TableClient data={data} />
        </section>

  )
}