import { getAllVisitas } from '@/actions/visitas'
import { useQuery } from '@tanstack/react-query'

const fetchVisitasData = async () => {
  try {
    const visitas = await getAllVisitas()
    return visitas
  } catch (error) {
    console.log(error)
  }
}

export function useVisitasData() {
  const query = useQuery({
    queryKey: ['visitas'],
    queryFn: fetchVisitasData!,
    refetchInterval: 1000 * 60 * 5 // 5 minutes
  })

  return query
}
