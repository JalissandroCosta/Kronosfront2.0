'use client'
import { Cela } from '@/@types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useCellData } from '@/hooks/celas/useCelasData'
import Image from 'next/image'
import Link from 'next/link'
import { AddCelaDialog } from './_components/add-cela'

export default function GerenciamentoCelasScreen() {
  const { data } = useCellData()

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col space-y-4">
        {/* Cabeçalho e Filtros */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <h1 className="text-2xl font-bold">Gerenciamento de Celas</h1>

          <div className="flex space-x-2">
            <AddCelaDialog>
              <Button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                Adicionar Cela
              </Button>
            </AddCelaDialog>
          </div>
        </div>

        {/* Grid de Celas */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(data ?? []).map((cela: Cela) => (
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
                  href={`celas/${cela.id}`}
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
