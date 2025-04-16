// src/app/admin/plans/page.tsx
import PlanPriceForm from './PlanPriceForm';

export default function AdminPlansPage() {
  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Update Plan Prices</h1>
      <PlanPriceForm />
    </div>
  );
}
