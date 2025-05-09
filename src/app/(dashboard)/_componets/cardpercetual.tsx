import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader
} from '@/components/ui/card'
import { IconTrendingUp } from '@tabler/icons-react'

type PecentualCardProps = {
  data: number
  title: string
  capacidade?: number
  percentual?: string
  direction?: string
}

export const PecentualCard = (props: PecentualCardProps) => {
  return (
    <Card className="relative mx-auto w-full max-w-[220px] min-w-[180px]">
      <CardHeader className="flex items-center">
        <CardDescription className="w-full text-center">
          {props.title}
        </CardDescription>

        {/* <CardTitle className="pt-2 text-4xl font-semibold tabular-nums @[250px]/card:text-4xl">
          {props.data}
          {props.capacidade && `/${props.capacidade}`}
        </CardTitle> */}

        {props.percentual && (
          <CardAction className="absolute right-1 bottom-1">
            <Badge
              variant="outline"
              className={`${
                props.direction === 'subiu'
                  ? 'bg-green-500/10 text-green-500'
                  : 'bg-red-500/10 text-red-500'
              } flex items-center gap-2`}
            >
              {props.direction === 'subiu' ? (
                <IconTrendingUp size={16} />
              ) : (
                <IconTrendingUp size={16} className="rotate-180" />
              )}
              {props.percentual}%
            </Badge>
          </CardAction>
        )}
      </CardHeader>
      <CardContent className="text-center text-4xl font-semibold">
        {props.data}
        {props.capacidade && `/${props.capacidade}`}
      </CardContent>
    </Card>
  )
}
