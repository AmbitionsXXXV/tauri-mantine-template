import { Center, Loader } from '@mantine/core'
import type { FC } from 'react'

const Splashscreen: FC = () => {
  return (
    <Center style={{ height: '100vh', width: '100vw' }}>
      <Loader size="xl" />
    </Center>
  )
}

export default Splashscreen
