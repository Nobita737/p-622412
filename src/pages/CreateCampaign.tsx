
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

const CreateCampaign = () => {
  return (
    <div className="bg-[#f7f7fb] min-h-screen">
      {/* Header Bar */}
      <header className="flex items-center justify-between px-8 py-6 bg-white border-b rounded-b-2xl shadow-sm">
        <div className="flex items-center space-x-4">
          <img src="/logo.svg" alt="Amplify logo" className="h-8 w-auto" />
        </div>
        <div className="flex items-center space-x-6">
          <button className="hover:scale-110 transition-transform"><span className="text-slate-500 text-lg">?</span></button>
          <button className="hover:scale-110 transition-transform"><span className="text-slate-500 text-lg">💬</span></button>
          <button className="ml-4 bg-[#7C3AED] text-white px-4 py-2 rounded-full text-base shadow hover:bg-[#6d28d9]">Login</button>
        </div>
      </header>
      {/* Two-Column Grid */}
      <main className="max-w-7xl mx-auto py-8 grid grid-cols-1 lg:grid-cols-[1.7fr_1fr] gap-10">
        <section className="space-y-8">
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
        <aside className="hidden lg:block sticky top-24 h-fit">
          <OrderSummarySidebar />
        </aside>
      </main>
    </div>
  );
};
export default CreateCampaign;
