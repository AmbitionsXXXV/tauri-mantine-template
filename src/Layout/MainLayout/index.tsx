import { useAsideGuard } from '@/Guard/useAsideGuard'
import NavLinks from '@/components/NavLinks'
import { views } from '@/router'
import {
  ActionIcon,
  AppShell,
  Burger,
  Group,
  Space,
  Text,
  useMantineColorScheme
} from '@mantine/core'
import { useHotkeys, useToggle } from '@mantine/hooks'
import { type FC } from 'react'
import { BsMoonStarsFill } from 'react-icons/bs'
import { IoSunnySharp } from 'react-icons/io5'
import { Navigate, Route, Routes } from 'react-router-dom'
import classes from './main-layout.module.css'
import { IMainLayoutProps } from './main-layout.type'

const { Aside, Header, Main, Navbar, Section } = AppShell

const MainLayout: FC<IMainLayoutProps> = ({ children }) => {
  const asideGuard = useAsideGuard()
  const [collapsed, toggleCollapsed] = useToggle([true, false])
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  useHotkeys([['ctrl+J', toggleColorScheme]])

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 200,
        breakpoint: 'sm',
        collapsed: { desktop: !collapsed }
      }}
      aside={{
        breakpoint: 'sm',
        width: { sm: 200, lg: 300 },
        collapsed: { desktop: false }
      }}
      className={classes.appShell}
    >
      <Main className={classes.appMain}>
        <Routes>
          <Route path="/" element={<Navigate to={views[0].path} />} />

          {views.map((view) => (
            <Route key={view.name} path={view.path} element={<view.component />} />
          ))}
        </Routes>

        {children}
      </Main>

      <Header data-tauri-drag-region p="md" className={classes.header}>
        <Group h="100%">
          <Burger
            size="sm"
            hiddenFrom="sm"
            opened={collapsed}
            onClick={() => toggleCollapsed()}
          />
          <Burger
            size="sm"
            visibleFrom="sm"
            opened={collapsed}
            onClick={() => toggleCollapsed()}
          />
          <Text>Header Title</Text>
        </Group>

        <Group className={classes.headerRightItems} h="110%">
          <ActionIcon
            size={30}
            id="toggle-theme"
            title="Ctrl + J"
            variant="default"
            onClick={() => toggleColorScheme()}
          >
            {colorScheme === 'dark' ? (
              <IoSunnySharp size={'1.5em'} />
            ) : (
              <BsMoonStarsFill />
            )}
          </ActionIcon>
        </Group>
      </Header>

      <Navbar h="100%" p="xs" className="overflow-y-auto">
        <Section grow className="overflow-y-auto">
          <NavLinks views={views} toggleCollapsed={toggleCollapsed} />
        </Section>

        <Section>
          <Space h={0} />
        </Section>
      </Navbar>

      {!asideGuard && (
        <Aside p="md">
          <Text>
            Right Side. Use for help, support, quick action menu? For example, if we were
            building a trading app, we could use the aside for the trade parameters while
            leaving the main UI with the data
          </Text>
        </Aside>
      )}
    </AppShell>
  )
}

export default MainLayout
