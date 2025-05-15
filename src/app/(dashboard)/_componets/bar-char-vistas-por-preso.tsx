'use client'

import { TrendingUp } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'

const chartData = [
  { preso: 'Marcos Afonso', visitas: 186, mobile: 80 },
  { preso: 'Lucas da Silva', visitas: 305, mobile: 200 },
  { preso: 'Jorge D.Mac', visitas: 237, mobile: 120 },
  { preso: 'Fabio de Sá', visitas: 73, mobile: 190 },
  { preso: 'Laura D. Mac', visitas: 209, mobile: 130 },
  { preso: 'Robson D. Mac', visitas: 214, mobile: 140 }
]

const chartConfig = {
  desktop: {
    label: 'olha',
    color: 'hsl(var(--chart-1))'
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))'
  },
  label: {
    color: 'hsl(var(--background))'
  }
} satisfies ChartConfig

type ChartBarProps = {
  chartData: {
    detentoId: string
    preso: string
    visitas: number
    foto: string
  }[]
}

export function BarCharVisitarPresoComponent({ chartData }: ChartBarProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Relatorio de Presos mais Visitados</CardTitle>
        <CardDescription>Ranking Top 6</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="max-h-[450px] lg:w-[500px]"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            barCategoryGap={3}
            barGap={50}
            width={500}
            height={300}
            className="fill-background"
          >
            <CartesianGrid horizontal={false} />
            {/* Nome dentro do totiliip */}
            <YAxis
              dataKey="preso"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="visitas" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="visitas"
              layout="vertical"
              fill="var(--color-desktop)"
              radius={4}
            >
              {/* Nome do preso dentro da barra */}
              <LabelList
                dataKey="preso"
                position="insideLeft"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
              <LabelList
                dataKey="visitas"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
