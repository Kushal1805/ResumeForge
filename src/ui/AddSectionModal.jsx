import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Briefcase, GraduationCap, Award, Languages, Code, AlignLeft, PlusCircle } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import { v4 as uuidv4 } from 'uuid';

const SECTION_OPTIONS = [
  { type: 'experience', label: 'Experience', icon: <Briefcase size={24} />, description: 'Job history & achievements' },
  { type: 'education', label: 'Education', icon: <GraduationCap size={24} />, description: 'Schools, degrees, courses' },
  { type: 'skills', label: 'Skills', icon: <Code size={24} />, description: 'Tools, languages, frameworks' },
  { type: 'projects', label: 'Projects', icon: <AlignLeft size={24} />, description: 'Personal or work projects' },
  { type: 'certifications', label: 'Certifications', icon: <Award size={24} />, description: 'Licenses and certificates' },
  { type: 'languages', label: 'Languages', icon: <Languages size={24} />, description: 'Languages you speak' },
  { type: 'custom', label: 'Custom', icon: <PlusCircle size={24} />, description: 'Awards, hobbies, volunteering' }
];

export default function AddSectionModal({ onClose }) {
  const { state, dispatch } = useResume();
  const currentTypes = state.sections.map(s => s.type);

  const handleAdd = (type) => {
    dispatch({ type: 'ADD_SECTION', payload: type });
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
        <motion.div 
          className="bg-[#1A1A24] border border-[#2E2E3D] rounded-2xl p-6 md:p-8 w-full max-w-2xl shadow-2xl relative"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-[#8B8A9F] hover:text-white transition-colors"
          >
            <X size={24} />
          </button>

          <h2 className="text-2xl font-bold text-[#F1F0FF] mb-2">Add New Section</h2>
          <p className="text-[#8B8A9F] mb-8">Choose a section to add to your resume.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {SECTION_OPTIONS.map(opt => {
              // Usually only 1 of each (except custom, but for simplicity let's allow adding any, maybe they want 2 Experience sections)
              return (
                <button
                  key={opt.type}
                  onClick={() => handleAdd(opt.type)}
                  className="flex flex-col items-start p-4 bg-[#16161D] border border-[#2E2E3D] rounded-xl hover:border-[#6C63FF] hover:bg-[#1E1E2A] transition-all group text-left"
                >
                  <div className="text-[#6C63FF] mb-3 group-hover:scale-110 transition-transform">{opt.icon}</div>
                  <h3 className="text-[#F1F0FF] font-semibold text-sm mb-1">{opt.label}</h3>
                  <p className="text-[#8B8A9F] text-xs">{opt.description}</p>
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
