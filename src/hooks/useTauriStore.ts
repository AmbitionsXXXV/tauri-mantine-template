import { SAVE_DELAY } from '@/constant'
import { Key, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Store } from 'tauri-plugin-store-api' // tauri-store docs: https://github.com/tauri-apps/tauri-plugin-store/blob/dev/webview-src/index.ts

const stores: Record<string, any> = {}

function getTauriStore(filename: string) {
  if (!(filename in stores)) stores[filename] = new Store(filename)

  return stores[filename]
}

export function useTauriStore<T = any>(
  key: Key,
  defaultValue: T,
  storeName = 'data.dat'
) {
  // storeName is a path that is relative to AppData if not absolute
  const [state, setState] = useState(defaultValue)
  const [loading, setLoading] = useState(true)
  const store = getTauriStore(storeName)
  const timeoutRef = useRef<number | null>(null)

  // useLayoutEffect will be called before DOM paintings and before useEffect
  useLayoutEffect(() => {
    let allow = true

    store
      .get(key)
      .then((value: T) => {
        if (value === null) throw new Error('value is null')

        if (allow) setState(value)
      })
      .catch(() => {
        store.set(key, defaultValue).then(() => {
          timeoutRef.current = setTimeout(() => store.save(), SAVE_DELAY)
        })
      })
      .then(() => {
        if (allow) setLoading(false)
      })

    return () => {
      allow = false
    }
  }, [])

  // useLayoutEffect does not like Promise return values.
  useEffect(() => {
    // do not allow setState to be called before data has even been loaded!
    // this prevents overwriting
    if (!loading) {
      clearTimeout(timeoutRef.current as number)

      store.set(key, state).then(() => {
        timeoutRef.current = setTimeout(() => {
          store.save()
        }, SAVE_DELAY)
      })
    }
    // ensure data is saved by not clearing the timeout on unmount
  }, [state])

  return [state, setState, loading]
}
