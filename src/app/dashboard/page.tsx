import { getAllPrisioners } from '@/actions/prisioner'
import { getAllVisitas } from '@/actions/visitas'
import { ChartBar } from '@/components/chart-bar'
import { SectionCards } from '@/components/section-cards'
import { contarPrisioneirosPorMes, contarVisitasPorMes, mesclarDados } from '@/utils/functions'

export default async function Page() {

  const [prisioneiros, visitas] = await Promise.all([
    getAllPrisioners(),
    getAllVisitas()
  ]);

  const visitasCount = contarVisitasPorMes(visitas);
  const prisioneirosCount = contarPrisioneirosPorMes(prisioneiros);

  const dadosMesclados = mesclarDados(visitasCount, prisioneirosCount);

  console.log(dadosMesclados);

  

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <div className="px-4 lg:px-6">
            <ChartBar chartData={dadosMesclados}/>
          </div>
          {/* <DataTable data={data} /> */}
        </div>
      </div>
    </div>
  )
}
