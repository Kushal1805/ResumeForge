import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { calculateATS } from '../utils/atsScorer';
import { ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ATSScore() {
  const { state } = useResume();
  const [expanded, setExpanded] = useState(false);
  const { score, tips } = calculateATS(state);

  let color = '#EF4444'; // Red
  if (score >= 50) color = '#F59E0B'; // Yellow
  if (score >= 75) color = '#10B981'; // Green

  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-[#1A1A24] border border-[#2E2E3D] rounded-xl p-4 shadow-sm">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center space-x-4">
          <div className="relative w-14 h-14 flex items-center justify-center">
            <svg className="transform -rotate-90 w-14 h-14">
              <circle
                cx="28"
                cy="28"
                r={radius}
                stroke="#2E2E3D"
                strokeWidth="4"
                fill="transparent"
              />
              <circle
                cx="28"
                cy="28"
                r={radius}
                stroke={color}
                strokeWidth="4"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <span className="absolute text-sm font-bold text-[#F1F0FF]">{score}</span>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#F1F0FF]">ATS Compatibility</h3>
            <p className="text-xs text-[#8B8A9F]">Score based on keywords & format</p>
          </div>
        </div>
        <button className="text-[#8B8A9F] hover:text-[#F1F0FF] transition-colors">
          {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-4 mt-2 border-t border-[#2E2E3D] space-y-2">
              {tips.length > 0 ? tips.map((tip, idx) => (
                <div key={idx} className="flex items-start space-x-2 text-xs text-[#F1F0FF]">
                  <AlertCircle size={14} className="text-[#F59E0B] flex-shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </div>
              )) : (
                <div className="text-xs text-[#10B981] flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  Great job! No major ATS warnings detected.
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
