import Fallback from '@/components/Fallback'
import About from '@/views/About'
import Home from '@/views/Home'
import Settings from '@/views/Settings'
import { Suspense, memo } from 'react'

export const views: Array<{
  component: React.FC
  path: string
  name: string
}> = [
  //     { component: () => <Home prop1={'stuff'} />, path: '/home', name: t('Home') },
  // Suspense example when a component was lazy loaded
  {
    component: () => (
      <Suspense fallback={<Fallback />}>
        <Settings />
      </Suspense>
    ),
    path: '/settings',
    name: 'Settings'
  },
  { component: Home, path: '/home', name: 'Home' },
  { component: memo(About), path: '/about', name: 'About' }
]
