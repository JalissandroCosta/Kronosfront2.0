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

// This is sample data.
// const data = {
//   user: {
//     name: "shadcn",
//     email: "m@example.com",
//     avatar: "/avatars/shadcn.jpg",
//   },
//   teams: [
//     {
//       name: "Acme Inc",
//       logo: GalleryVerticalEnd,
//       plan: "Enterprise",
//     },
//     {
//       name: "Acme Corp.",
//       logo: AudioWaveform,
//       plan: "Startup",
//     },
//     {
//       name: "Evil Corp.",
//       logo: Command,
//       plan: "Free",
//     },
//   ],
//   navMain: [
//     {
//       title: "Prisioners",
//       url: "/dashboard/prisioners",
//       icon: SquareTerminal,
//       isActive: true,

//     },
//     {
//       title: "Usuários",
//       url: "#",
//       icon: Bot,
//     },
//     {
//       title: "Celas",
//       url: "#",
//       icon: BookOpen,
//     },
//     {
//       title: "Settings",
//       url: "#",
//       icon: Settings2,
//     },
//   ],
//   projects: [
//     {
//       name: "Design Engineering",
//       url: "#",
//       icon: Frame,
//     },
//     {
//       name: "Sales & Marketing",
//       url: "#",
//       icon: PieChart,
//     },
//     {
//       name: "Travel",
//       url: "#",
//       icon: Map,
//     },
//   ],
// }

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
    url: '#',
    icon: User2
  },
  {
    title: 'Celas',
    url: '#',
    icon: Grid2X2
  }
]
const User = {
  name: 'shadcn',
  email: 'm@example.com',
  avatar: '/avatars/shadcn.jpg'
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
        <NavUser user={User} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
