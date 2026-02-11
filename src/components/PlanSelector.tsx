export const PlanSelector = ({
  itemType,
  setItemType,
}: {
  itemType: 'monthly' | 'yearly';
  setItemType: (itemType: 'monthly' | 'yearly') => void;
}) => {
  const isMonthly = itemType === 'monthly';
  const isYearly = itemType === 'yearly';

  return (
    <div className="flex gap-3">
      <button
        type="button"
        onClick={() => setItemType('monthly')}
        className={`relative flex flex-col items-start w-full max-w-[240px] rounded-lg border p-4 text-left transition-colors cursor-pointer ${
          isMonthly
            ? 'border-sky-200 bg-sky-50'
            : 'border-slate-300 bg-transparent'
        }`}
      >
        <div className="flex items-start justify-between w-full">
          <span
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
              isMonthly
                ? 'border-sky-500 bg-sky-500'
                : 'border-slate-400 bg-white'
            }`}
          >
            {isMonthly ? (
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
            ) : null}
          </span>
        </div>
        <span className="mt-3 font-semibold text-slate-800">Monthly</span>
        <span className="mt-1 text-sm text-slate-600">
          $20.00/month + tax
        </span>
      </button>

      <button
        type="button"
        onClick={() => setItemType('yearly')}
        className={`relative flex flex-col items-start w-full max-w-[240px] rounded-lg border p-4 text-left transition-colors cursor-pointer ${
          isYearly
            ? 'border-sky-200 bg-sky-50'
            : 'border-slate-300 bg-transparent'
        }`}
      >
        <div className="absolute right-3 top-3 rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-medium text-sky-700">
          Save 17%
        </div>
        <div className="flex items-start justify-between w-full">
          <span
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
              isYearly
                ? 'border-sky-500 bg-sky-500'
                : 'border-slate-400 bg-white'
            }`}
          >
            {isYearly ? (
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
            ) : null}
          </span>
        </div>
        <span className="mt-3 font-semibold text-slate-800">Yearly</span>
        <span className="mt-1 text-sm text-slate-600">
          $200.00/year + tax
        </span>
      </button>
    </div>
  );
};
