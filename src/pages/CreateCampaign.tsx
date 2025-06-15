
import React from "react";
import BudgetSelector from "@/components/create-campaign/BudgetSelector";
import ContentTabPanel from "@/components/create-campaign/ContentTabPanel";
import CategoryCarousel from "@/components/create-campaign/CategoryCarousel";
import QualitySelector from "@/components/create-campaign/QualitySelector";
import CreatorCarousel from "@/components/create-campaign/CreatorCarousel";
import ShippingDetails from "@/components/create-campaign/ShippingDetails";
import ProductCategoryTags from "@/components/create-campaign/ProductCategoryTags";
import PostOrderOverview from "@/components/create-campaign/PostOrderOverview";
import GuidelinesAccordion from "@/components/create-campaign/GuidelinesAccordion";
import RefundPolicy from "@/components/create-campaign/RefundPolicy";
import OrderSummarySidebar from "@/components/create-campaign/OrderSummarySidebar";
import { MessageCircle, HelpCircle } from "lucide-react";

const CreateCampaign = () => {
  return (
    <div className="bg-background min-h-screen font-sans">
      {/* Header Bar */}
      <header className="flex items-center justify-between px-8 py-6 bg-white border-b border-primary-100 rounded-b-2xl shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/dbd91403-5d2d-4aa5-902a-c1a3df6966ea.png" 
              alt="Campayn Logo" 
              className="w-8 h-8"
            />
            <h1 className="text-2xl font-bold text-primary-900 font-sans tracking-tight">Campayn</h1>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <button className="hover:scale-110 transition-transform p-2 hover:bg-primary-50 rounded-full">
            <HelpCircle className="h-5 w-5 text-primary-400" />
          </button>
          <button className="hover:scale-110 transition-transform p-2 hover:bg-primary-50 rounded-full">
            <MessageCircle className="h-5 w-5 text-primary-400" />
          </button>
          <button className="ml-4 bg-primary-400 text-white px-6 py-2 rounded-full text-base shadow hover:bg-primary-500 font-semibold transition-colors">
            Login
          </button>
        </div>
      </header>

      {/* Two-Column Grid */}
      <main className="max-w-7xl mx-auto py-8 px-4 grid grid-cols-1 lg:grid-cols-[70%_30%] gap-8">
        {/* Left Column - Campaign Builder Form */}
        <section className="space-y-6">
          <BudgetSelector />
          <ContentTabPanel />
          <CategoryCarousel />
          <QualitySelector />
          <CreatorCarousel />
          <ShippingDetails />
          <ProductCategoryTags />
          <PostOrderOverview />
          <GuidelinesAccordion />
          <RefundPolicy />
        </section>

        {/* Right Column - Sticky Order Summary */}
        <aside className="hidden lg:block">
          <div className="sticky top-4">
            <OrderSummarySidebar />
          </div>
        </aside>
      </main>
    </div>
  );
};

export default CreateCampaign;
