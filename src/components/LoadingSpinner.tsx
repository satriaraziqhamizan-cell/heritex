import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  label?: string;
  message?: string;
  className?: string;
  color?: 'terracotta' | 'teal' | 'white' | 'stone';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  label,
  message,
  className = '',
  color = 'terracotta'
}) => {
  const displayLabel = label || message;
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-10 h-10 border-3',
    xl: 'w-14 h-14 border-4'
  };

  const colorClasses = {
    terracotta: 'border-[#E8C4B5] border-t-[#C85A32] dark:border-amber-900/40 dark:border-t-[#E07A5F]',
    teal: 'border-[#A8DDD9] border-t-[#1E7773] dark:border-teal-900/40 dark:border-t-[#268A86]',
    white: 'border-white/30 border-t-white',
    stone: 'border-stone-200 border-t-stone-700 dark:border-slate-700 dark:border-t-slate-200'
  };

  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <div
        className={`rounded-full animate-spin ${sizeClasses[size]} ${colorClasses[color]}`}
        role="status"
        aria-label="Memuat..."
      />
      {displayLabel && (
        <span className="text-xs font-semibold text-[#4A5E5D] dark:text-slate-300 animate-pulse">
          {displayLabel}
        </span>
      )}
    </div>
  );
};
