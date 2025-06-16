
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Download, DollarSign, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickActionsToolbarProps {
  onLaunchCampaign?: () => void;
  onExportReport?: () => void;
  onAddFunds?: () => void;
  className?: string;
}

export const QuickActionsToolbar = React.forwardRef<HTMLDivElement, QuickActionsToolbarProps>(
  ({ onLaunchCampaign, onExportReport, onAddFunds, className, ...props }, ref) => {
    const handleLaunchCampaign = () => {
      window.open('https://preview--zestful-campaign-craft.lovable.app/', '_blank');
    };

    return (
      <div
        ref={ref}
        className={cn(
          "fixed bottom-6 right-6 z-50 animate-scale-in",
          className
        )}
        {...props}
      >
        <div className="bg-white rounded-lg shadow-elevation border p-3 flex space-x-3">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Zap className="h-3 w-3 mr-1" />
            Quick Actions
          </Badge>
          
          <Button 
            className="bg-primary-600 hover:bg-primary-700 text-white shadow-md"
            onClick={handleLaunchCampaign}
          >
            <Plus className="h-4 w-4 mr-2" />
            Launch Campaign
          </Button>
          
          <Button 
            variant="outline" 
            className="border-primary-200 text-primary-700 hover:bg-primary-50"
            onClick={onExportReport}
          >
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          
          <Button 
            variant="outline" 
            className="border-primary-200 text-primary-700 hover:bg-primary-50"
            onClick={onAddFunds}
          >
            <DollarSign className="h-4 w-4 mr-2" />
            Add Funds
          </Button>
        </div>
      </div>
    );
  }
);

QuickActionsToolbar.displayName = "QuickActionsToolbar";
