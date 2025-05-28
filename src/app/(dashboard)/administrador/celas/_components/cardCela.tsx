import { Cela } from '@/@types'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

type CelaProps = Cela & {}

export const CelaCard = ({
  capacidade,
  alocacoes,
  id,
  numero,
  pavilhao
}: CelaProps) => {
  return (
    <Card className="transition-shadow hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative aspect-video overflow-hidden rounded-t-lg bg-gray-100">
          <div
            className={`absolute top-2 right-2 rounded-full px-2 py-1 text-xs font-medium`}
          ></div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg">
          Cela Nº {numero} - {pavilhao}
        </CardTitle>
        <div className="mt-2 space-y-2">
          <p className="text-sm">
            <span className="font-medium">Capacidade:</span> {alocacoes.length}/
            {capacidade} presos
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        <Button variant="outline" size="sm">
          Detalhes
        </Button>
        {/* <Button size="sm" disabled={cela.status === 'manutencao'}>
                  {cela.status === 'disponivel' ? 'Adicionar Animal' : 'Gerenciar'}
                </Button> */}
      </CardFooter>
    </Card>
  )
}
