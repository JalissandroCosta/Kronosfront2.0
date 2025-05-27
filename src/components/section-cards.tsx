import { Prisioner, Visita } from '@/@types/index'
import { getAllCelas } from '@/actions/celas'
import { getAllPrisioners } from '@/actions/prisioner'
import { getAllUser } from '@/actions/user'
import { getAllVisitas } from '@/actions/visitas'
import { PecentualCard } from '@/app/(dashboard)/_componets/cardpercetual'
import { verificarTrending } from '@/utils/functions'

type SectionCardsProps = {
  data: {
    month: string
    visita: number
    detento: number
  }[]
}
export async function SectionCards({ data }: SectionCardsProps) {
  const celas = await getAllCelas()
  const AllPresioneiros: Prisioner[] = await getAllPrisioners()
  const AllVisitas: Visita[] = await getAllVisitas()
  const visitas = verificarTrending(data, 'visita')
  const detentos = verificarTrending(data, 'detento')
  const totalUsers = await getAllUser()

  return (
    <div className="grid grid-cols-2 place-items-center gap-4 px-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
      <PecentualCard
        data={AllPresioneiros.length}
        title={'Total de Prisioneiros'}
        direction={detentos?.direcao}
        percentual={detentos?.valorFormatado}
      />
      <PecentualCard
        data={AllVisitas.length}
        title={'Total de Visitas'}
        direction={visitas?.direcao}
        percentual={visitas?.valorFormatado}
      />
      <PecentualCard
        data={AllPresioneiros.length}
        title={'Capacidade da Prisão'}
        capacidade={celas.length * 10}
        direction={detentos?.direcao}
        percentual={detentos?.valorFormatado}
      />

      <PecentualCard data={totalUsers.length} title={'Total Usuários'} />
    </div>
  )
}
