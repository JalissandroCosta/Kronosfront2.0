
export type RoutesLink = {
  title: string
  url: string
  hole: ('ADM' | 'INSP' | 'DIR')[]
  // icon: ReactNode
  icon: string
}

// Tipos dos papéis de usuários
type Cargo = 'ADM' | 'INSP' | 'DIR'

export const routesLink: RoutesLink[] = [
  {
    title: 'Painel',
    url: '/',
    hole: ['ADM','DIR'],
    icon: 'Settings2'
  },
  {
    title: 'Usuários',
    url: '/users',
    hole: ['ADM','DIR'],
    icon: 'Users2' 
  },
  {
    title: 'Prisioneiros',
    url: '/prisioners',
    hole: ['ADM','DIR',"INSP"],
    icon: 'Users2' 
  },
  {
    title: 'Celas',
    url: '/celas',
    hole: ['ADM','DIR',"INSP"],
    icon: 'Grid2X2' 
  },
  {
    title: 'Visitas',
    url: '/visitas',
    hole: ['ADM','DIR',"INSP"],
    icon: 'Users2' 
  }
]

// Função para gerar o caminho dinâmico
export const getDynamicPath = (role: Cargo, basePath: string): string => {
  switch (role) {
    case 'ADM':
      return `/administrador${basePath}`
    case 'INSP':
      return `/inspetor${basePath}`
    case 'DIR':
      return `/diretor${basePath}`
    default:
      return basePath
  }
}
/// / Filtrando e gerando as rotas dinâmicas com base no papel do usuário
export const generateNavLinks = (role: Cargo): RoutesLink[] => {
  return routesLink
    .filter((route) => route.hole.includes(role))
    .map((route) => ({
      ...route,
      url: getDynamicPath(role, route.url)
    }))
}