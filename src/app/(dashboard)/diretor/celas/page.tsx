import { Cela } from '@/@types'
import { getAllCelas } from '@/actions/celas'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'

export default async function GerenciamentoCelasScreen() {
  const celas = await getAllCelas()



  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col space-y-4">
        {/* Cabeçalho e Filtros */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <h1 className="text-2xl font-bold">Gerenciamento de Celas</h1>

          <div className="flex space-x-2">
            {/* <Button variant="outline" onClick={() => setFilterOpen(!filterOpen)}>
              <FilterIcon className="mr-2 h-4 w-4" />
              Filtros
            </Button> */}

            {/* <Button>
              <PlusIcon className="mr-2 h-4 w-4" />
              Nova Cela
            </Button> */}
          </div>
        </div>

        {/* Barra de pesquisa */}
        {/* <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Pesquisar celas ou animais..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filtros expandidos */}
        {/* {filterOpen && (
          <div className="rounded-lg border p-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <Label htmlFor="filter-pavilhao">Pavilhão</Label>
                <select
                  id="filter-pavilhao"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={selectedPavilhao}
                  onChange={(e) => setSelectedPavilhao(e.target.value)}
                >
                  <option value="">Todos</option>
                  <option value="A">Pavilhão A</option>
                  <option value="B">Pavilhão B</option>
                  <option value="C">Pavilhão C</option>
                </select>
              </div>
              <div>
                <Label htmlFor="filter-status">Status</Label>
                <select
                  id="filter-status"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Todos</option>
                  <option value="disponivel">Disponível</option>
                  <option value="ocupada">Ocupada</option>
                  <option value="manutencao">Manutenção</option>
                </select>
              </div>
              <div>
                <Label htmlFor="filter-capacity">Capacidade mínima</Label>
                <Input id="filter-capacity" type="number" placeholder="Filtrar por capacidade" />
              </div>
            </div>
          </div>
        )} */}

        {/* Grid de Celas */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {celas.map((cela: Cela) => (
            <Card key={cela.id} className="transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="flex justify-between">
                  <CardTitle className="text-lg">
                    Cela Nº {cela.numero} - {cela.pavilhao}
                  </CardTitle>
                  <Badge
                    variant={
                      cela.alocacoes.length >= 10 ? 'destructive' : 'outline'
                    }
                  >
                    {cela.alocacoes.length}/{cela.capacidade}
                  </Badge>
                </div>

                <Image
                  alt="image de grades de presidio"
                  src={'/cela-cadeia.jpg'}
                  width={200}
                  height={200}
                  className="h-32 w-full rounded-t-lg object-cover"
                />
              </CardHeader>
              <CardContent>
                <Link
                  href={`/dashboard/celas/${cela.id}`}
                  className="flex h-full flex-col items-center justify-center rounded-lg bg-blue-500 p-3 text-white transition-colors hover:bg-blue-600"
                >
                  Gerenciamento
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mensagem quando não há resultados */}
        {/* {filteredCelas.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-lg text-gray-500">Nenhuma cela encontrada</p>
            <Button variant="link" onClick={() => {
              setSearchTerm('')
              setSelectedPavilhao('')
            }}>
              Limpar filtros
            </Button>
          </div>
        )} */}
      </div>
    </div>
  )
}
