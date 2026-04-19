import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Share2, Download, RefreshCw } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import { encodeState } from '../utils/shareLink';

export default function ExportModal({ onClose, onStartOver }) {
  const { state } = useResume();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 }, zIndex: 1000, colors: ['#6C63FF', '#34D399', '#F59E0B'] });

    const timer = setTimeout(() => {
      onClose();
    }, 8000); // auto-close after 8 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  const handleShare = () => {
    const url = encodeState(state);
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "resume_backup.json");
    dlAnchorElem.click();
  };

  const checkmarkVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1, 
      transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } 
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
        <motion.div 
          className="bg-[#1A1A24] border border-[#2E2E3D] rounded-2xl p-8 max-w-md w-full shadow-2xl relative"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-emerald-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path 
                  d="M5 13L9 17L19 7" 
                  stroke="currentColor" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  variants={checkmarkVariants}
                  initial="hidden"
                  animate="visible"
                />
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold text-[#F1F0FF] mb-2">Your resume is ready! 🎉</h2>
            <p className="text-[#8B8A9F] mb-8">What would you like to do next?</p>

            <div className="flex flex-col w-full space-y-3">
              <button 
                onClick={handleShare} 
                className="flex items-center justify-center w-full py-3 bg-[#6C63FF] text-white font-medium rounded-lg hover:bg-[#5A52E0] transition-colors"
              >
                {copied ? <Check size={18} className="mr-2" /> : <Share2 size={18} className="mr-2" />}
                {copied ? 'Link Copied!' : 'Share resume link'}
              </button>

              <button 
                onClick={handleExportJSON}
                className="flex items-center justify-center w-full py-3 border border-[#2E2E3D] text-[#F1F0FF] hover:bg-[#2E2E3D] font-medium rounded-lg transition-colors"
              >
                <Download size={18} className="mr-2" />
                Export as JSON
              </button>

              <button 
                onClick={() => {
                  if (window.confirm("Are you sure? This will clear your current resume.")) {
                    localStorage.removeItem('resumeState');
                    onStartOver();
                  }
                }}
                className="flex items-center justify-center w-full py-3 text-[#8B8A9F] hover:text-red-400 font-medium rounded-lg transition-colors"
              >
                <RefreshCw size={18} className="mr-2" />
                Start Over
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
