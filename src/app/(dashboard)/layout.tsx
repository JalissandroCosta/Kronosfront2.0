import { AppSidebar } from '@/components/sidebar/app-sidebar'
import { generateNavLinks } from '@/components/sidebar/route-links'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar'
import { getUser, IUser } from '@/utils/get-users'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function ProtectedRoutesLayout({
  children
}: {
  children: React.ReactNode
}) {
  const userStore = await cookies()
  const hasUser = userStore.has('app-auth-token')

  if (!hasUser) {
    redirect('/')
  }

  const { nome, cargo, email }: IUser = await getUser()

  const user = { name: nome, email, cargo }
  const navLinks = generateNavLinks(cargo)

 

  return (
    <SidebarProvider>
      <AppSidebar user={user} listMenu={navLinks}/>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
