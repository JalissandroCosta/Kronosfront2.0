'use client'

import { Grid2X2, Settings2, User2, Users2 } from 'lucide-react'

import * as React from 'react'

import { NavUser } from '../nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from '../ui/sidebar'
import { NavMain } from './nav-main'

const Menu = [
  {
    title: 'Painel',
    url: '/dashboard',
    icon: Settings2
  },
  {
    title: 'Prisioneiros',
    url: '/dashboard/prisioners',
    icon: Users2,
    isActive: true
  },
  {
    title: 'Usuários',
    url: '/dashboard/users',
    icon: User2
  },
  {
    title: 'Celas',
    url: '/dashboard/celas',
    icon: Grid2X2
  },
  {
    title: 'visitantes',
    url: '/dashboard/visitantes',
    icon: Users2
  }
]
const User = {
  name: 'shadcn',
  email: 'm@example.com',
  avatar: '/avatars/shadcn.jpg'
}

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  user: {
    name: string
    email: string
    cargo: string
  }
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
        <div className="bg-muted/50 relative aspect-video overflow-hidden rounded-xl">
          <img
            src="/web-app-manifest-192x192.png"
            alt="Descrição da imagem"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={Menu} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
