export default async function Page() {
  // const [prisioneiros, visitas] = await Promise.all([
  //   getAllPrisioners(),
  //   getAllVisitas()
  // ])

  // const top6MaisVisitados = getTop6DetentosMaisVisitados(visitas)

  // const visitasCount = contarVisitasPorMes(visitas)
  // const prisioneirosCount = contarPrisioneirosPorMes(prisioneiros)

  // const dadosMesclados = mesclarDados(visitasCount, prisioneirosCount)

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          {/* <SectionCards data={dadosMesclados} /> */}
          <div className="flex w-full flex-col justify-evenly gap-6 px-4 lg:flex-row lg:px-5">
            {/* <ChartBar chartData={dadosMesclados} /> */}
            {/* <BarCharVisitarPresoComponent chartData={top6MaisVisitados}/> */}
          </div>
        </div>
      </div>
    </div>
  )
}
