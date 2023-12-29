import { Group, Text } from '@mantine/core'
import type { FC, SetStateAction } from 'react'
import { NavLink } from 'react-router-dom'
import classes from './nav-links.module.css'

export interface INavLinksProps {
  views: any[]
  toggleCollapsed?: (value?: SetStateAction<boolean> | undefined) => void
}

const NavLinks: FC<INavLinksProps> = ({ views }) => {
  return views.map((view) => (
    <NavLink
      key={view.name}
      to={view.path}
      end={view.exact}
      // onClick={() => toggleCollapsed()}
      className={({ isActive }) =>
        `${classes.navLink} ${isActive ? classes.navLinkActive : classes.navLinkInactive}`
      }
    >
      <Group>
        <Text>{view.name ? view.name : view.name}</Text>
      </Group>
    </NavLink>
  ))
}

export default NavLinks
