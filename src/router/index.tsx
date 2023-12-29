import About from '@/views/About'
import Home from '@/views/Home'
import { memo } from 'react'

export const views: Array<{
  component: React.FC
  path: string
  name: string
}> = [
  //     { component: () => <Home prop1={'stuff'} />, path: '/home', name: t('Home') },
  // Suspense example when a component was lazy loaded
  //     { component: () => <React.Suspense fallback={<Fallback />}><Setting /></React.Suspense>, path: '/settings', name: t('Settings') },
  { component: Home, path: '/home', name: 'Home' },
  { component: memo(About), path: '/about', name: 'About' }
]
