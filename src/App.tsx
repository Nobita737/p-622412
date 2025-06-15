import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CampaynSidebar from "@/components/CampaynSidebar";
import TopNavigation from "@/components/TopNavigation";
import Dashboard from "./pages/Dashboard";
import Campaigns from "./pages/Campaigns";
import Creators from "./pages/Creators";
import Analytics from "./pages/Analytics";
import Budget from "./pages/Budget";
import Reports from "./pages/Reports";
import Help from "./pages/Help";
import Settings from "./pages/Settings";
import CreateCampaign from "./pages/CreateCampaign";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex min-h-screen bg-slate-50">
          <CampaynSidebar />
          <div className="flex-1 ml-64">
            <TopNavigation />
            <main className="p-6">
              <div className="max-w-7xl mx-auto">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/campaigns" element={<Campaigns />} />
                  <Route path="/creators" element={<Creators />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/budget" element={<Budget />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/help" element={<Help />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/create-campaign" element={<CreateCampaign />} />
                </Routes>
              </div>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
