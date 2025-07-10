
import { Home, Users, BarChart3, DollarSign, FileText, HelpCircle, Target, Compass } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: Target, label: "Campaigns", path: "/campaigns" },
  { icon: Users, label: "Creators", path: "/creators" },
  { icon: Compass, label: "Explore Creators", path: "/explore-creators" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
  { icon: DollarSign, label: "Budget & Payments", path: "/budget" },
  { icon: FileText, label: "Reports & Exports", path: "/reports" },
  { icon: HelpCircle, label: "Help & Support", path: "/help" },
];

const CampaynSidebar = () => {
  const location = useLocation();

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-slate-200 shadow-sm">
      <div className="flex flex-col h-full">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Campayn</h2>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                      isActive 
                        ? "bg-primary text-white shadow-md" 
                        : "text-slate-600 hover:text-primary hover:bg-primary-25"
                    )}
                  >
                    <Icon className={cn(
                      "h-5 w-5 transition-colors",
                      isActive ? "text-white" : "text-slate-500 group-hover:text-primary"
                    )} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50">
            <div className="h-8 w-8 rounded-full gradient-bg flex items-center justify-center">
              <span className="text-white text-sm font-medium">JD</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-slate-800">John Doe</span>
              <span className="text-xs text-slate-500">Brand Manager</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaynSidebar;
