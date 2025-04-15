import { getAllPrisioners } from '@/actions/prisioner'
import { PecentualCard } from '@/app/dashboard/_componets/cardpercetual'
import { Prisioner } from '@/@types/index'

export async function SectionCards() {
  const AllPresioneiros: Prisioner[] = await getAllPrisioners()

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <PecentualCard data={AllPresioneiros.length} title={'Prisioneiros'} />
      <PecentualCard data={20} title={'Visitantes'} />
    </div>
  )
}
