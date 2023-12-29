import { RUNNING_IN_TAURI } from '../constant'
import { useLocalForage } from './useLocalForage'
import { useTauriStore } from './useTauriStore'

export const useStorage = RUNNING_IN_TAURI ? useTauriStore : useLocalForage
