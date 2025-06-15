import { Home, Users, BarChart3, DollarSign, FileText, HelpCircle, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: Target, label: "Campaigns", path: "/campaigns" },
  { icon: Users, label: "Creators", path: "/creators" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
  { icon: DollarSign, label: "Budget & Payments", path: "/budget" },
  { icon: FileText, label: "Reports & Exports", path: "/reports" },
  { icon: HelpCircle, label: "Help & Support", path: "/help" },
];

const CampaynSidebar = () => {
  const location = useLocation();

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-slate-900 border-r border-slate-700">
      <div className="flex flex-col h-full">
        <div className="p-6">
          <div className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/dbd91403-5d2d-4aa5-902a-c1a3df6966ea.png" 
              alt="Campayn Logo" 
              className="w-8 h-8"
            />
            <h2 className="text-2xl font-bold text-white">Campayn</h2>
          </div>
        </div>
        
        <nav className="flex-1 px-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                      "hover:bg-slate-800",
                      isActive 
                        ? "bg-teal-600 text-white" 
                        : "text-slate-300 hover:text-white"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 mt-auto border-t border-slate-700">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="h-8 w-8 rounded-full bg-teal-500 flex items-center justify-center">
              <span className="text-white text-sm font-medium">JD</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white">John Doe</span>
              <span className="text-xs text-slate-400">Brand Manager</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaynSidebar;
