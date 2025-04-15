"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export const description = "An interactive area chart"

const chartData = [
  { date: "2024-04-01", detentos: 222, visitantes: 150 },
  { date: "2024-04-02", detentos: 97, visitantes: 180 },
  { date: "2024-04-03", detentos: 167, visitantes: 120 },
  { date: "2024-04-04", detentos: 242, visitantes: 260 },
  { date: "2024-04-05", detentos: 373, visitantes: 290 },
  { date: "2024-04-06", detentos: 301, visitantes: 340 },
  { date: "2024-04-07", detentos: 245, visitantes: 180 },
  { date: "2024-04-08", detentos: 409, visitantes: 320 },
  { date: "2024-04-09", detentos: 59, visitantes: 110 },
  { date: "2024-04-10", detentos: 261, visitantes: 190 },
  { date: "2024-04-11", detentos: 327, visitantes: 350 },
  { date: "2024-04-12", detentos: 292, visitantes: 210 },
  { date: "2024-04-13", detentos: 342, visitantes: 380 },
  { date: "2024-04-14", detentos: 137, visitantes: 220 },
  { date: "2024-04-15", detentos: 120, visitantes: 170 },
  { date: "2024-04-16", detentos: 138, visitantes: 190 },
  { date: "2024-04-17", detentos: 446, visitantes: 360 },
  { date: "2024-04-18", detentos: 364, visitantes: 410 },
  { date: "2024-04-19", detentos: 243, visitantes: 180 },
  { date: "2024-04-20", detentos: 89, visitantes: 150 },
  { date: "2024-04-21", detentos: 137, visitantes: 200 },
  { date: "2024-04-22", detentos: 224, visitantes: 170 },
  { date: "2024-04-23", detentos: 138, visitantes: 230 },
  { date: "2024-04-24", detentos: 387, visitantes: 290 },
  { date: "2024-04-25", detentos: 215, visitantes: 250 },
  { date: "2024-04-26", detentos: 75, visitantes: 130 },
  { date: "2024-04-27", detentos: 383, visitantes: 420 },
  { date: "2024-04-28", detentos: 122, visitantes: 180 },
  { date: "2024-04-29", detentos: 315, visitantes: 240 },
  { date: "2024-04-30", detentos: 454, visitantes: 380 },
  { date: "2024-05-01", detentos: 165, visitantes: 220 },
  { date: "2024-05-02", detentos: 293, visitantes: 310 },
  { date: "2024-05-03", detentos: 247, visitantes: 190 },
  { date: "2024-05-04", detentos: 385, visitantes: 420 },
  { date: "2024-05-05", detentos: 481, visitantes: 390 },
  { date: "2024-05-06", detentos: 498, visitantes: 520 },
  { date: "2024-05-07", detentos: 388, visitantes: 300 },
  { date: "2024-05-08", detentos: 149, visitantes: 210 },
  { date: "2024-05-09", detentos: 227, visitantes: 180 },
  { date: "2024-05-10", detentos: 293, visitantes: 330 },
  { date: "2024-05-11", detentos: 335, visitantes: 270 },
  { date: "2024-05-12", detentos: 197, visitantes: 240 },
  { date: "2024-05-13", detentos: 197, visitantes: 160 },
  { date: "2024-05-14", detentos: 448, visitantes: 490 },
  { date: "2024-05-15", detentos: 473, visitantes: 380 },
  { date: "2024-05-16", detentos: 338, visitantes: 400 },
  { date: "2024-05-17", detentos: 499, visitantes: 420 },
  { date: "2024-05-18", detentos: 315, visitantes: 350 },
  { date: "2024-05-19", detentos: 235, visitantes: 180 },
  { date: "2024-05-20", detentos: 177, visitantes: 230 },
  { date: "2024-05-21", detentos: 82, visitantes: 140 },
  { date: "2024-05-22", detentos: 81, visitantes: 120 },
  { date: "2024-05-23", detentos: 252, visitantes: 290 },
  { date: "2024-05-24", detentos: 294, visitantes: 220 },
  { date: "2024-05-25", detentos: 201, visitantes: 250 },
  { date: "2024-05-26", detentos: 213, visitantes: 170 },
  { date: "2024-05-27", detentos: 420, visitantes: 460 },
  { date: "2024-05-28", detentos: 233, visitantes: 190 },
  { date: "2024-05-29", detentos: 78, visitantes: 130 },
  { date: "2024-05-30", detentos: 340, visitantes: 280 },
  { date: "2024-05-31", detentos: 178, visitantes: 230 },
  { date: "2024-06-01", detentos: 178, visitantes: 200 },
  { date: "2024-06-02", detentos: 470, visitantes: 410 },
  { date: "2024-06-03", detentos: 103, visitantes: 160 },
  { date: "2024-06-04", detentos: 439, visitantes: 380 },
  { date: "2024-06-05", detentos: 88, visitantes: 140 },
  { date: "2024-06-06", detentos: 294, visitantes: 250 },
  { date: "2024-06-07", detentos: 323, visitantes: 370 },
  { date: "2024-06-08", detentos: 385, visitantes: 320 },
  { date: "2024-06-09", detentos: 438, visitantes: 480 },
  { date: "2024-06-10", detentos: 155, visitantes: 200 },
  { date: "2024-06-11", detentos: 92, visitantes: 150 },
  { date: "2024-06-12", detentos: 492, visitantes: 420 },
  { date: "2024-06-13", detentos: 81, visitantes: 130 },
  { date: "2024-06-14", detentos: 426, visitantes: 380 },
  { date: "2024-06-15", detentos: 307, visitantes: 350 },
  { date: "2024-06-16", detentos: 371, visitantes: 310 },
  { date: "2024-06-17", detentos: 475, visitantes: 520 },
  { date: "2024-06-18", detentos: 107, visitantes: 170 },
  { date: "2024-06-19", detentos: 341, visitantes: 290 },
  { date: "2024-06-20", detentos: 408, visitantes: 450 },
  { date: "2024-06-21", detentos: 169, visitantes: 210 },
  { date: "2024-06-22", detentos: 317, visitantes: 270 },
  { date: "2024-06-23", detentos: 480, visitantes: 530 },
  { date: "2024-06-24", detentos: 132, visitantes: 180 },
  { date: "2024-06-25", detentos: 141, visitantes: 190 },
  { date: "2024-06-26", detentos: 434, visitantes: 380 },
  { date: "2024-06-27", detentos: 448, visitantes: 490 },
  { date: "2024-06-28", detentos: 149, visitantes: 200 },
  { date: "2024-06-29", detentos: 103, visitantes: 160 },
  { date: "2024-06-30", detentos: 446, visitantes: 400 },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
    color: "var(--primary)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--primary)",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total de Detentos</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total de Detentos no últimos 3 meses
          </span>
          <span className="@[540px]/card:hidden">Last 3 months</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">3 meses</ToggleGroupItem>
            <ToggleGroupItem value="30d">30 dias</ToggleGroupItem>
            <ToggleGroupItem value="7d">7 dias</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                3 meses
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                30 dias
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                7 dias
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              defaultIndex={isMobile ? -1 : 10}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="detentos"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="visitantes"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
