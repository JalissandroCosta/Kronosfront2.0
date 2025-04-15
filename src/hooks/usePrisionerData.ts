import { getAllPrisioners } from "@/actions/prisioner";
import { useQuery } from "@tanstack/react-query";


const fetchPrisionerData = async () => {
  try {
    const prisioners = await getAllPrisioners()
    return prisioners
  } catch (error) {
    console.log(error)
  }

}

export function usePrisionerData() {
  const query = useQuery({
    queryKey: ["prisioners"],
    queryFn: fetchPrisionerData!,
    refetchInterval: 1000 * 60 * 5, // 5 minutes

  });

  return query
}