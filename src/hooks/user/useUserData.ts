import { getAllUser } from '@/actions/user'
import { useQuery } from '@tanstack/react-query'

const fetchUserData = async () => {
  try {
    const users = await getAllUser()
    return users
  } catch (error) {
    console.log(error)
  }
}

export function useUserData() {
  const query = useQuery({
    queryKey: ['users'],
    queryFn: fetchUserData!,
    refetchInterval: 1000 * 60 * 5 // 5 minutes
  })

  return query
}
