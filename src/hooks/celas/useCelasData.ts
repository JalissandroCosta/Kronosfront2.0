import { getAllCelas } from '@/actions/celas'
import { useQuery } from '@tanstack/react-query'

const fetchCellData = async () => {
  try {
    const cells = await getAllCelas()
    return cells
  } catch (error) {
    console.log(error)
  }
}

export function useCellData() {
  const query = useQuery({
    queryKey: ['celas'],
    queryFn: fetchCellData,
    refetchInterval: 1000 * 60 * 5 // 5 minutes
  })

  return query
}
