import { Center, Loader } from '@mantine/core'
import type { FC } from 'react'

const Fallback: FC = () => {
  return (
    <Center style={{ height: '100vh', width: '100vw' }}>
      <Loader size="xl" />
    </Center>
  )
}

export default Fallback
