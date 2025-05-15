import { getAllPrisionersCelas } from '@/actions/celas'
import { useQuery } from '@tanstack/react-query'

const fetchPrisionerCellData = async ({
  queryKey
}: {
  queryKey: [string, string]
}) => {
  const [, id] = queryKey
  try {
    const prisionersAlocation = await getAllPrisionersCelas(id)
    return prisionersAlocation
  } catch (error) {
    console.log(error)
  }
}



export function usePrisionerCellData(id: string) {
  const query = useQuery({
    queryKey: ['prisioners-celas', id],
    queryFn: fetchPrisionerCellData,
    refetchInterval: 1000 * 60 * 5 // 5 minutes
  })

  return query
}
