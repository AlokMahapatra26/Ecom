"use client"
import {Label ,  Pie, PieChart } from "recharts"


import {
  CardContent,
 
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A donut chart"

const chartData = [
  { status: "pending", count: 275, fill: "var(--color-pending)" },
  { status: "processing", count: 200, fill: "var(--color-processing)" },
  { status: "shipped", count: 187, fill: "var(--color-shipped)" },
  { status: "delivered", count: 173, fill: "var(--color-delivered)" },
  { status: "cancelled", count: 90, fill: "var(--color-cancelled)" },
   { status: "unverified", count: 90, fill: "var(--color-unverified)" },
]

const chartConfig = {
  status: {
    label: "Status",
  },
  pending: {
    label: "Pending",
    color: "#4dbcae",
  },
  processing: {
    label: "Processing",
    color: "#007c70",
  },
  shipped: {
    label: "Shipped",
    color: "#00413b",
  },
  delivered: {
    label: "Delivered",
    color: "#005e55",
  },
  cancelled: {
    label: "Cancelled",
    color: "#4a8e85",
  },
  unverified: {
    label: "Unverified",
    color: "#708f8b",
  },
} satisfies ChartConfig

export function OrderStatus() {
  return (
    
   <div>
     <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent  />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="status"
              innerRadius={60}
            >
                            <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                         {100}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Order 
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>

          </PieChart>
        </ChartContainer>
      </CardContent>

      <div className="">
                <ul>
                    <li className="flex justify-between items-center mb-3 text-sm">
                        <span>Pending</span>
                        <span className="rounded-full px-2 text-sm ">0</span>
                    </li>
                    <li className="flex justify-between items-center mb-3 text-sm">
                        <span>Processing</span>
                        <span className="rounded-full px-2 text-sm ">0</span>
                    </li>
                    <li className="flex justify-between items-center mb-3 text-sm">
                        <span>Shipped</span>
                        <span className="rounded-full px-2 text-sm ">0</span>
                    </li>
                    <li className="flex justify-between items-center mb-3 text-sm">
                        <span>Delivered</span>
                        <span className="rounded-full px-2 text-sm ">0</span>
                    </li>
                    <li className="flex justify-between items-center mb-3 text-sm">
                        <span>Cancelled</span>
                        <span className="rounded-full px-2 text-sm ">0</span>
                    </li>
                    <li className="flex justify-between items-center mb-3 text-sm">
                        <span>Unverified</span>
                        <span className="rounded-full px-2 text-sm ">0</span>
                    </li>
                </ul>
      </div>
   </div>
  )
}
