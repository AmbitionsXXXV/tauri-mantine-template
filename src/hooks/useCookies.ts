import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'

type SameSiteType = 'lax' | 'strict' | 'Strict' | 'Lax' | 'none' | 'None' | undefined

export function useCookie(
  key: string,
  defaultValue: string,
  {
    expires = 365000,
    sameSite = 'lax',
    path = '/'
  }: { sameSite?: SameSiteType; path?: string; expires?: number } = {}
) {
  const cookieValue = Cookies.get(key)
  const [state, setState] = useState(cookieValue || defaultValue)

  useEffect(() => {
    Cookies.set(key, state, { expires, sameSite, path })
  }, [state])

  return [state, setState]
}
