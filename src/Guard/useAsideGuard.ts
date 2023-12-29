import { routeNoAsideList } from '@/constant/route-no-aside-list'
import { usePathname } from '@/router/hooks/usePathName'

export const useAsideGuard = () => {
  const pathname = usePathname()

  return routeNoAsideList.includes(pathname)
}
