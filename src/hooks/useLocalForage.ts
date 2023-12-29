import localforage from 'localforage'
import { useEffect, useLayoutEffect, useState } from 'react'

export function useLocalForage<T = any>(key: string, defaultValue: T) {
  // only supports primitives, arrays, and {} objects
  const [state, setState] = useState<any>(defaultValue)
  const [loading, setLoading] = useState(true)

  // useLayoutEffect will be called before DOM paintings and before useEffect
  useLayoutEffect(() => {
    let allow = true

    localforage
      .getItem(key)
      .then((value) => {
        if (value === null) throw ''

        if (allow) setState(value)
      })
      .catch(() => localforage.setItem(key, defaultValue))
      .then(() => {
        if (allow) setLoading(false)
      })

    return () => {
      allow = false
    }
  }, [])

  useEffect(() => {
    // do not allow setState to be called before data has even been loaded!
    // this prevents overwriting
    if (!loading) localforage.setItem(key, state)
  }, [state])
  return [state, setState, loading]
}
