'use client'

import { TrendingUp } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

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
  { Mes: 'Janeiro', Visitante: 186, Detentos: 80 },
  { Mes: 'Fevereiro', Visitante: 305, Detentos: 200 },
  { Mes: 'Março', Visitante: 237, Detentos: 120 },
  { Mes: 'Abril', Visitante: 73, Detentos: 190 },
  { Mes: 'Maio', Visitante: 209, Detentos: 130 },
  { Mes: 'Junho', Visitante: 214, Detentos: 140 }
]

const chartConfig = {
  visitante: {
    label: 'visitante',
    color: 'hsl(var(--chart-1))'
  },
  detentos: {
    label: 'detentos',
    color: 'hsl(var(--chart-2))'
  }
} satisfies ChartConfig

export function BarChartComponet() {
  return (
    <Card>
      <CardHeader>
        <CardTitle></CardTitle>
        <CardDescription>Janeiro - Julho 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="mes"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="Visitante" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="Detentos" fill="var(--color-mobile)" radius={4} />
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
