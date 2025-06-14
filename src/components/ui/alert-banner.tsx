
import * as React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, AlertTriangle, AlertCircle, CheckCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface AlertBannerProps {
  type: "error" | "warning" | "success" | "info";
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  onDismiss?: () => void;
  dismissible?: boolean;
  className?: string;
}

const alertConfig = {
  error: {
    icon: AlertCircle,
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    textColor: "text-red-800",
    iconColor: "text-red-600",
    buttonVariant: "destructive" as const,
  },
  warning: {
    icon: AlertTriangle,
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    textColor: "text-yellow-800",
    iconColor: "text-yellow-600",
    buttonVariant: "default" as const,
  },
  success: {
    icon: CheckCircle,
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    textColor: "text-green-800",
    iconColor: "text-green-600",
    buttonVariant: "default" as const,
  },
  info: {
    icon: Info,
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-800",
    iconColor: "text-blue-600",
    buttonVariant: "default" as const,
  },
};

export const AlertBanner = React.forwardRef<HTMLDivElement, AlertBannerProps>(
  ({ 
    type, 
    title, 
    description, 
    actionLabel, 
    onAction, 
    onDismiss, 
    dismissible = true,
    className,
    ...props 
  }, ref) => {
    const config = alertConfig[type];
    const Icon = config.icon;

    return (
      <Alert
        ref={ref}
        className={cn(
          "border-l-4 rounded-r-lg animate-fade-in",
          config.bgColor,
          config.borderColor,
          className
        )}
        {...props}
      >
        <div className="flex items-start space-x-3 w-full">
          <Icon className={cn("h-5 w-5 mt-0.5", config.iconColor)} />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className={cn("font-medium text-sm", config.textColor)}>
                  {title}
                </div>
                
                {description && (
                  <AlertDescription className={cn("text-sm", config.textColor)}>
                    {description}
                  </AlertDescription>
                )}
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                {actionLabel && onAction && (
                  <Button
                    variant={config.buttonVariant}
                    size="sm"
                    onClick={onAction}
                    className="h-8 text-xs"
                  >
                    {actionLabel}
                  </Button>
                )}
                
                {dismissible && onDismiss && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onDismiss}
                    className={cn("h-8 w-8 p-0 hover:bg-white/50", config.textColor)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Alert>
    );
  }
);

AlertBanner.displayName = "AlertBanner";
