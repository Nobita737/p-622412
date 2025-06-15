
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Check } from "lucide-react";

const OrderSummarySidebar = () => {
  // Mock data for pricing calculation
  const pricing = {
    micro: { count: 25, price: 3900 },
    medium: { count: 13, price: 7400 },
    large: { count: 8, price: 14200 }
  };

  const totalCost = 
    pricing.micro.count * pricing.micro.price +
    pricing.medium.count * pricing.medium.price +
    pricing.large.count * pricing.large.price;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-slate-900 mb-2">
          Select creator package & place order
        </h2>
        <p className="text-sm text-slate-600">
          Live pricing based on your selections
        </p>
      </div>

      {/* Input Summary */}
      <div className="space-y-3 p-4 bg-slate-50 rounded-xl">
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Budget:</span>
          <span className="font-medium">₹25,000</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Duration:</span>
          <span className="font-medium">30 days</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Category:</span>
          <span className="font-medium">Fashion</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Quality:</span>
          <span className="font-medium">Mass</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Shipping:</span>
          <span className="font-medium">Required</span>
        </div>
      </div>

      {/* Pricing Breakdown */}
      <div className="space-y-3">
        <h3 className="font-semibold text-slate-900">Pricing Breakdown</h3>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
            <div>
              <span className="text-sm font-medium text-blue-900">Micro creators</span>
              <p className="text-xs text-blue-700">{pricing.micro.count} creators</p>
            </div>
            <span className="font-semibold text-blue-900">
              ₹{(pricing.micro.count * pricing.micro.price).toLocaleString()}
            </span>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
            <div>
              <span className="text-sm font-medium text-green-900">Medium creators</span>
              <p className="text-xs text-green-700">{pricing.medium.count} creators</p>
            </div>
            <span className="font-semibold text-green-900">
              ₹{(pricing.medium.count * pricing.medium.price).toLocaleString()}
            </span>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
            <div>
              <span className="text-sm font-medium text-purple-900">Large creators</span>
              <p className="text-xs text-purple-700">{pricing.large.count} creators</p>
            </div>
            <span className="font-semibold text-purple-900">
              ₹{(pricing.large.count * pricing.large.price).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Green Badge */}
      <Badge className="w-full justify-center bg-green-100 text-green-800 hover:bg-green-100 py-2">
        <Check className="h-4 w-4 mr-2" />
        Receive minimum 50 creator options
      </Badge>

      {/* Primary CTA */}
      <Button className="w-full bg-[#7C3AED] hover:bg-[#6d28d9] text-white font-semibold py-3 text-base">
        Place order @ ₹{totalCost.toLocaleString()}
      </Button>

      {/* Secondary Actions */}
      <div className="flex flex-col space-y-2 text-center">
        <button className="flex items-center justify-center space-x-2 text-[#7C3AED] hover:text-[#6d28d9] text-sm font-medium">
          <FileText className="h-4 w-4" />
          <span>View price breakup</span>
        </button>
        <button className="flex items-center justify-center space-x-2 text-[#7C3AED] hover:text-[#6d28d9] text-sm font-medium">
          <Download className="h-4 w-4" />
          <span>Download proposal</span>
        </button>
      </div>
    </div>
  );
};

export default OrderSummarySidebar;
