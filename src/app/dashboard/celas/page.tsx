'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SearchIcon, FilterIcon, PlusIcon } from 'lucide-react'
import { useState } from 'react'

type detento = {
  id: string
  nome: string
  especie: string
  idade: string
  sexo: 'M' | 'F'
  observacoes: string
  imagem?: string
}

type Cela = {
  id: string
  numero: number
  pavilhao: string
  capacidade: number
  Detento: detento[]
  status: 'disponivel' | 'ocupada' | 'manutencao'
}

export default function GerenciamentoCelasScreen() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedPavilhao, setSelectedPavilhao] = useState<string>('')

  // Dados de exemplo - substitua por sua API real
  const [celas, setCelas] = useState<Cela[]>([
    {
      id: 'A1',
      numero: 1,
      pavilhao: 'A',
      capacidade: 4,
      status: 'ocupada',
      Detento: [
        {
          id: '1',
          nome: 'Boi Alfa',
          especie: 'Bovino',
          idade: '3 anos',
          sexo: 'M',
          observacoes: 'Vacinação em dia',
          imagem: 'https://source.unsplash.com/random/300x300/?cow'
        }
      ]
    },
    {
      id: 'A2',
      numero: 2,
      pavilhao: 'A',
      capacidade: 4,
      status: 'disponivel',
      Detento: []
    },
    {
      id: 'A3',
      numero: 3,
      pavilhao: 'A',
      capacidade: 4,
      status: 'ocupada',
      Detento: [
        {
          id: '2',
          nome: 'Vaca Beta',
          especie: 'Bovino',
          idade: '4 anos',
          sexo: 'F',
          observacoes: 'Precisa de suplementação',
          imagem: 'https://source.unsplash.com/random/300x300/?cow'
        }
      ]
    },
    {
      id: 'B1',
      numero: 1,
      pavilhao: 'B',
      capacidade: 3,
      status: 'manutencao',
      Detento: []
    },
    {
      id: 'B2',
      numero: 2,
      pavilhao: 'B',
      capacidade: 3,
      status: 'ocupada',
      Detento: [
        {
          id: '3',
          nome: 'Boi Gama',
          especie: 'Bovino',
          idade: '2 anos',
          sexo: 'M',
          observacoes: 'Recém-chegado',
          imagem: 'https://source.unsplash.com/random/300x300/?cow'
        },
        {
          id: '4',
          nome: 'Boi Delta',
          especie: 'Bovino',
          idade: '5 anos',
          sexo: 'M',
          observacoes: 'Para abate',
          imagem: 'https://source.unsplash.com/random/300x300/?cow'
        }
      ]
    },
    {
      id: 'B3',
      numero: 3,
      pavilhao: 'B',
      capacidade: 3,
      status: 'disponivel',
      Detento: []
    },
    {
      id: 'C1',
      numero: 1,
      pavilhao: 'C',
      capacidade: 5,
      status: 'ocupada',
      Detento: [
        {
          id: '5',
          nome: 'Vaca Épsilon',
          especie: 'Bovino',
          idade: '6 anos',
          sexo: 'F',
          observacoes: 'Produção leiteira',
          imagem: 'https://source.unsplash.com/random/300x300/?cow'
        }
      ]
    },
    {
      id: 'C2',
      numero: 2,
      pavilhao: 'C',
      capacidade: 5,
      status: 'disponivel',
      Detento: []
    },
    {
      id: 'C3',
      numero: 3,
      pavilhao: 'C',
      capacidade: 5,
      status: 'ocupada',
      Detento: [
        {
          id: '6',
          nome: 'Bezerro Zeta',
          especie: 'Bovino',
          idade: '3 meses',
          sexo: 'M',
          observacoes: 'Desmame recente',
          imagem: 'https://source.unsplash.com/random/300x300/?calf'
        }
      ]
    }
  ])

  const filteredCelas = celas.filter(cela => {
    const matchesSearch = cela.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cela.Detento.some(Detento => Detento.nome.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesPavilhao = selectedPavilhao === '' || cela.pavilhao === selectedPavilhao
    
    return matchesSearch && matchesPavilhao
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'disponivel':
        return 'bg-green-100 text-green-800'
      case 'ocupada':
        return 'bg-blue-100 text-blue-800'
      case 'manutencao':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col space-y-4">
        {/* Cabeçalho e Filtros */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <h1 className="text-2xl font-bold">Gestão de Pavilhões e Celas</h1>
          
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => setFilterOpen(!filterOpen)}>
              <FilterIcon className="mr-2 h-4 w-4" />
              Filtros
            </Button>
            
            <Button>
              <PlusIcon className="mr-2 h-4 w-4" />
              Nova Cela
            </Button>
          </div>
        </div>

        {/* Barra de pesquisa */}
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Pesquisar celas ou animais..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filtros expandidos */}
        {filterOpen && (
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
        )}

        {/* Grid de Celas */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCelas.map((cela) => (
            <Card key={cela.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <div className="aspect-video overflow-hidden rounded-t-lg bg-gray-100 relative">
                  {cela.Detento.length > 0 ? (
                    <img
                      src={cela.Detento[0].imagem || 'https://source.unsplash.com/random/300x300/?cow'}
                      alt={cela.Detento[0].nome}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-gray-400">
                      <span>Cela vazia</span>
                    </div>
                  )}
                  <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(cela.status)}`}>
                    {cela.status === 'disponivel' && 'Disponível'}
                    {cela.status === 'ocupada' && 'Ocupada'}
                    {cela.status === 'manutencao' && 'Manutenção'}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lg">
                  Cela {cela.numero} - Pavilhão {cela.pavilhao}
                </CardTitle>
                <div className="mt-2 space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Capacidade:</span> {cela.Detento.length}/{cela.capacidade} animais
                  </p>
                  {cela.Detento.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Animais:</p>
                      <ul className="text-sm space-y-1">
                        {cela.Detento.map(detento => (
                          <li key={detento.id} className="flex items-center">
                            <span className="inline-block h-2 w-2 rounded-full bg-primary mr-2"></span>
                            {detento.nome} ({detento.especie})
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between p-4 pt-0">
                <Button variant="outline" size="sm">
                  Detalhes
                </Button>
                <Button size="sm" disabled={cela.status === 'manutencao'}>
                  {cela.status === 'disponivel' ? 'Adicionar Animal' : 'Gerenciar'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Mensagem quando não há resultados */}
        {filteredCelas.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-lg text-gray-500">Nenhuma cela encontrada</p>
            <Button variant="link" onClick={() => {
              setSearchTerm('')
              setSelectedPavilhao('')
            }}>
              Limpar filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}