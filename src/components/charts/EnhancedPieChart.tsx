import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { cn } from '@/lib/utils';
interface EnhancedPieChartProps {
  data: any[];
  title: string;
  dataKey: string;
  nameKey: string;
  colorKey?: string;
  className?: string;
  showPercentage?: boolean;
}
export const EnhancedPieChart: React.FC<EnhancedPieChartProps> = ({
  data,
  title,
  dataKey,
  nameKey,
  colorKey = 'color_hex',
  className,
  showPercentage = true
}) => {
  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    value,
    name
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
    return <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={12} fontWeight="bold">
        {showPercentage ? `${value}%` : value}
      </text>;
  };
  return;
};