import packageJson from '../../package.json'
import tauriConfJson from '../../src-tauri/tauri.conf.json'

export const HEADER_TITLE = 'HEADER_TITLE goes here'
export const FOOTER = 'FOOTER goes here'
export const SAVE_DELAY = 500
export const APP_NAME = tauriConfJson.package.productName
export const VERSION = packageJson.version
export const WINDOW_TITLE = 'WINDOW_TITLE set in utils.js'
export const RUNNING_IN_TAURI = window.__TAURI__ !== undefined
export const IS_DEVELOPMENT = import.meta.env.MODE === 'development'
export const IS_PRODUCTION = !IS_DEVELOPMENT
