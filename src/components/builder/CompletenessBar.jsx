import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { calculateCompleteness } from '../../utils/completenessScore';

export default function CompletenessBar() {
  const { state } = useResume();
  const score = calculateCompleteness(state);
  
  let colorClass = 'from-red-500 to-rose-400';
  if (score >= 40) colorClass = 'from-amber-500 to-yellow-400';
  if (score >= 70) colorClass = 'from-emerald-500 to-green-400';

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs font-semibold text-[#8B8A9F] uppercase tracking-wider">Completeness</span>
        <span className="text-xs font-bold text-[#F1F0FF]">{score}%</span>
      </div>
      <div className="h-1.5 w-full bg-[#2E2E3D] rounded-full overflow-hidden">
        <div 
          className={`h-full bg-gradient-to-r ${colorClass} transition-all duration-500 ease-out`} 
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}
