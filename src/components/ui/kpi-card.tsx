
import * as React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Info, TrendingUp, TrendingDown } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  title: string;
  value: string | number;
  description?: string;
  trend?: {
    value: string;
    direction: "up" | "down" | "neutral";
  };
  sparklineData?: number[];
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
  onClick?: () => void;
  tooltip?: string;
  formatValue?: (value: string | number) => string;
}

const MiniSparkline = ({ data }: { data: number[] }) => (
  <div className="h-8 w-16">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data.map((value, index) => ({ value, index }))}>
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke="#0066CC" 
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export const KpiCard = React.forwardRef<HTMLDivElement, KpiCardProps>(
  ({ 
    title, 
    value, 
    description, 
    trend, 
    sparklineData, 
    icon: Icon, 
    className, 
    onClick,
    tooltip,
    formatValue,
    ...props 
  }, ref) => {
    const formattedValue = formatValue ? formatValue(value) : value;
    
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Card 
              ref={ref}
              className={cn(
                "relative overflow-hidden transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 cursor-pointer group border-l-4 border-l-primary-500 bg-white",
                onClick && "cursor-pointer",
                className
              )}
              onClick={onClick}
              {...props}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center space-x-2">
                  <h3 className="text-sm font-medium text-slate-600">{title}</h3>
                  {tooltip && (
                    <Info className="h-4 w-4 text-slate-400" />
                  )}
                </div>
                {Icon && (
                  <div className="p-2 rounded-full bg-primary-50">
                    <Icon className="h-5 w-5 text-primary-600" />
                  </div>
                )}
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-slate-900 group-hover:text-primary-700 transition-colors">
                      {formattedValue}
                    </div>
                    
                    {description && (
                      <p className="text-xs text-slate-600">{description}</p>
                    )}
                    
                    {trend && (
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant="secondary" 
                          className={cn(
                            "text-xs",
                            trend.direction === "up" && "bg-green-100 text-green-800",
                            trend.direction === "down" && "bg-red-100 text-red-800",
                            trend.direction === "neutral" && "bg-gray-100 text-gray-800"
                          )}
                        >
                          {trend.direction === "up" && <TrendingUp className="h-3 w-3 mr-1" />}
                          {trend.direction === "down" && <TrendingDown className="h-3 w-3 mr-1" />}
                          {trend.value}
                        </Badge>
                      </div>
                    )}
                  </div>
                  
                  {sparklineData && (
                    <div className="opacity-80 group-hover:opacity-100 transition-opacity">
                      <MiniSparkline data={sparklineData} />
                    </div>
                  )}
                </div>
              </CardContent>
              
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </Card>
          </TooltipTrigger>
          {tooltip && (
            <TooltipContent>
              <p className="max-w-xs">{tooltip}</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    );
  }
);

KpiCard.displayName = "KpiCard";
