'use client'

import * as Icons from 'lucide-react'; // importa todos os ícones
import { LucideIcon } from 'lucide-react';
import * as React from 'react';

import { NavUser } from '../nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarRail
} from '../ui/sidebar';
import { NavMain } from './nav-main';
import { RoutesLink } from './route-links';



type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  user: {
    name: string
    email: string
    cargo: string
  },
  listMenu: RoutesLink[]
}

// Função auxiliar segura
function getLucideIcon(name: string): LucideIcon | undefined {
  return Icons[name as keyof typeof Icons] as LucideIcon | undefined
}



export function AppSidebar({ user ,listMenu, ...props }: AppSidebarProps) {


  const items = listMenu.map((link) => ({
    title: link.title,
    url: link.url,
    icon: getLucideIcon(link.icon), // Pass the icon name as a string
  }))

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
        <NavMain items={items} />
        <SidebarGroup>
      {/* <SidebarMenu>
        {listMenu.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild tooltip={item.title}>
              <a href={item.url} className="flex items-center gap-2">
                {item.icon && <item.icon className="h-4 w-4" />}
                <span>{item.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu> */}
    </SidebarGroup>
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
