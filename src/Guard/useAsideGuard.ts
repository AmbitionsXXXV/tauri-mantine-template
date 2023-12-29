import { routeNoAsideList } from '@/constant/route-no-aside-list'
import { usePathname } from '@/router/hooks/usePathname'

export const useAsideGuard = () => {
  const pathname = usePathname()

  return routeNoAsideList.includes(pathname)
}
