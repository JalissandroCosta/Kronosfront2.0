import { getAllVisitante } from '@/actions/visitante'
import { useQuery } from '@tanstack/react-query'

const fetchVisitanteData = async () => {
  try {
    const prisioners = await getAllVisitante()
    return prisioners
  } catch (error) {
    console.log(error)
  }
}

export function useVisitanteData() {
  const query = useQuery({
    queryKey: ['visitantes'],
    queryFn: fetchVisitanteData!,
    refetchInterval: 1000 * 60 * 5 // 5 minutes
  })

  return query
}
