import React from 'react';

interface SkeletonCardProps {
  type?: 'card' | 'list' | 'map-point' | 'badge' | 'table-row';
  count?: number;
  className?: string;
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({
  type = 'card',
  count = 1,
  className = ''
}) => {
  const items = Array.from({ length: count }, (_, i) => i);

  if (type === 'list') {
    return (
      <div className={`space-y-3 ${className}`}>
        {items.map((i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/70 dark:bg-slate-800/80 border border-[#E5DFD2] dark:border-slate-700 animate-pulse"
          >
            <div className="h-10 w-10 rounded-xl bg-[#EBE5D8] dark:bg-slate-700 shrink-0" />
            <div className="flex-1 space-y-2 min-w-0">
              <div className="h-3.5 bg-[#E2DBD0] dark:bg-slate-600 rounded-md w-2/3" />
              <div className="h-2.5 bg-[#EBE5D8] dark:bg-slate-700 rounded-md w-1/2" />
            </div>
            <div className="h-6 w-16 bg-[#EBE5D8] dark:bg-slate-700 rounded-lg shrink-0" />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'badge') {
    return (
      <div className={`grid grid-cols-2 sm:grid-cols-3 gap-3 ${className}`}>
        {items.map((i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-3 rounded-2xl bg-white/70 dark:bg-slate-800/80 border border-[#E5DFD2] dark:border-slate-700 animate-pulse"
          >
            <div className="h-12 w-12 rounded-2xl bg-[#EBE5D8] dark:bg-slate-700 shrink-0" />
            <div className="flex-1 space-y-1.5">
              <div className="h-3 bg-[#E2DBD0] dark:bg-slate-600 rounded-md w-3/4" />
              <div className="h-2 bg-[#EBE5D8] dark:bg-slate-700 rounded-md w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'table-row') {
    return (
      <tbody className={`divide-y divide-[#EFECE4] dark:divide-slate-700 ${className}`}>
        {items.map((i) => (
          <tr key={i} className="animate-pulse">
            <td className="px-4 py-3"><div className="h-3 bg-[#EBE5D8] dark:bg-slate-700 rounded w-24" /></td>
            <td className="px-4 py-3"><div className="h-3 bg-[#EBE5D8] dark:bg-slate-700 rounded w-32" /></td>
            <td className="px-4 py-3"><div className="h-3 bg-[#EBE5D8] dark:bg-slate-700 rounded w-20" /></td>
            <td className="px-4 py-3"><div className="h-3 bg-[#EBE5D8] dark:bg-slate-700 rounded w-16" /></td>
          </tr>
        ))}
      </tbody>
    );
  }

  // Default: Grid Card type
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
      {items.map((i) => (
        <div
          key={i}
          className="rounded-3xl bg-white dark:bg-slate-800 border border-[#E5DFD2] dark:border-slate-700 p-4 space-y-3.5 animate-pulse shadow-2xs"
        >
          <div className="h-36 w-full rounded-2xl bg-[#EBE5D8] dark:bg-slate-700" />
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="h-3 bg-[#E2DBD0] dark:bg-slate-600 rounded w-1/3" />
              <div className="h-3 bg-[#EBE5D8] dark:bg-slate-700 rounded w-16" />
            </div>
            <div className="h-4 bg-[#DCD4C7] dark:bg-slate-600 rounded w-4/5" />
            <div className="h-2.5 bg-[#EBE5D8] dark:bg-slate-700 rounded w-full" />
            <div className="h-2.5 bg-[#EBE5D8] dark:bg-slate-700 rounded w-2/3" />
          </div>
          <div className="pt-2 border-t border-[#EFECE4] dark:border-slate-700 flex justify-between items-center">
            <div className="h-3 bg-[#EBE5D8] dark:bg-slate-700 rounded w-20" />
            <div className="h-7 w-24 bg-[#E2DBD0] dark:bg-slate-600 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
};
