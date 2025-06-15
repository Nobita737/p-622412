
import React, { useState } from "react";

const budgetOptions = [
  5000, 10000, 25000, 50000, 100000
];

const BudgetSelector = () => {
  const [budgetIdx, setBudgetIdx] = useState(2); // Default to ₹25,000
  const budgetValue = budgetOptions[budgetIdx];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col">
      <h2 className="text-xl font-semibold mb-2 text-primary-900">Campaign Budget</h2>
      <div className="flex items-center gap-4">
        {/* Slider */}
        <input type="range"
               min={0}
               max={budgetOptions.length - 1}
               step={1}
               value={budgetIdx}
               onChange={e => setBudgetIdx(Number(e.target.value))}
               className="flex-1 accent-[#7C3AED]"
               style={{ accentColor: "#7C3AED" }}
        />
        <div className="ml-4 font-medium text-[#7C3AED] text-lg">{`₹${budgetValue.toLocaleString()}`}</div>
      </div>
      <div className="flex justify-between mt-2 text-sm text-slate-500">
        {budgetOptions.map((amount, i) => (
          <span key={i} className={`${i === budgetIdx ? "text-[#7C3AED]" : ""}`}>₹{amount.toLocaleString()}</span>
        ))}
      </div>
      {/* Tooltip info */}
      <div className="mt-4 p-3 rounded-xl bg-[#FDE68A] text-yellow-900 font-medium text-sm">
        My budget is slightly flexible—<span className="font-semibold">40% to ₹1,40,000</span>. Creators may pitch close offers!
      </div>
      <div className="mt-2">
        <div className="rounded-xl text-xs bg-slate-100 px-4 py-2 text-slate-500">
          Amplify is a free platform connecting brands to creators. No hidden fees.
        </div>
      </div>
    </div>
  );
};

export default BudgetSelector;
