import Splashscreen from '@/Layout/Splashscreen'
import { ColorSchemeScript, MantineProvider, createTheme } from '@mantine/core'
import '@mantine/core/styles.css'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import '@mantine/notifications/styles.css'
import type { FC, ReactElement } from 'react'
import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'

export interface IProviderProps {
  children?: ReactElement
}

const Provider: FC<IProviderProps> = ({ children }) => {
  // long tasks should use useState(true)
  const [isLoading] = useState(false)

  const theme = createTheme({
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Segoe UI Variable Text, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji',
    // added source-code-pro and SFMono-Regular
    fontFamilyMonospace:
      'source-code-pro, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
    components: {
      Checkbox: {
        styles: { input: { cursor: 'pointer' }, label: { cursor: 'pointer' } }
      },
      TextInput: { styles: { label: { marginTop: '0.5rem' } } },
      Select: { styles: { label: { marginTop: '0.5rem' } } },
      Loader: { defaultProps: { size: 'xl' } },
      Space: { defaultProps: { h: 'sm' } },
      Anchor: { defaultProps: { target: '_blank' } },
      Burger: { styles: { burger: { color: '--mantine-color-grey-6' } } }
    }
  })

  return (
    <>
      <ColorSchemeScript defaultColorScheme="auto" />

      <MantineProvider defaultColorScheme="auto" theme={theme} withCssVariables>
        <ModalsProvider>
          <BrowserRouter>
            <Notifications />
            {/* show SplashScreen for initial data */}
            {isLoading ? <Splashscreen /> : children}
          </BrowserRouter>
        </ModalsProvider>
      </MantineProvider>
    </>
  )
}

export default Provider
