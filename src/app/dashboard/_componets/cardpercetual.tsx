import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardAction,
  CardFooter
} from '@/components/ui/card'

type PecentualCardProps = {
  data: number
  title: string
}

export const PecentualCard = (props: PecentualCardProps) => {
  return (
    <Card className="@container/card">
      <CardHeader className="flex items-end">
        <CardDescription className="h-full w-full">
          Total de {props.title}
        </CardDescription>
        <CardTitle className="text-4xl font-semibold tabular-nums @[250px]/card:text-4xl">
          {props.data}
        </CardTitle>
        {/* <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction> */}
      </CardHeader>
    </Card>
  )
}
