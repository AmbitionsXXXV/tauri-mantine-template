import { Button } from '@mantine/core'
import { invoke } from '@tauri-apps/api/tauri'
import type { FC } from 'react'

const Settings: FC = () => {
  const invokeConfig = async () => {
    invoke('get_config')
  }

  return (
    <>
      <div>Settings</div>

      <Button onClick={invokeConfig}>invoke config</Button>
    </>
  )
}

export default Settings
