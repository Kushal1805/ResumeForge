import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, ChevronDown, ChevronUp, Eye, EyeOff, Trash2 } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { motion, AnimatePresence } from 'framer-motion';

// Imports for section editors (to be created)
import HeaderSection from '../sections/HeaderSection';
import SummarySection from '../sections/SummarySection';
import ExperienceSection from '../sections/ExperienceSection';
import EducationSection from '../sections/EducationSection';
import SkillsSection from '../sections/SkillsSection';
import ProjectsSection from '../sections/ProjectsSection';
import CertificationsSection from '../sections/CertificationsSection';
import LanguagesSection from '../sections/LanguagesSection';
import CustomSection from '../sections/CustomSection';

const SectionEditorMap = {
  header: HeaderSection,
  summary: SummarySection,
  experience: ExperienceSection,
  education: EducationSection,
  skills: SkillsSection,
  projects: ProjectsSection,
  certifications: CertificationsSection,
  languages: LanguagesSection,
  custom: CustomSection
};

export default function SectionCard({ section }) {
  const { dispatch } = useResume();
  const [expanded, setExpanded] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Drag listeners specifically for the handle
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
  };

  const handleToggleVis = () => dispatch({ type: 'TOGGLE_SECTION_VISIBILITY', payload: section.id });
  const handleDelete = () => dispatch({ type: 'REMOVE_SECTION', payload: section.id });

  const Editor = SectionEditorMap[section.type];

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative bg-[#1A1A24] rounded-xl shadow-lg border border-[#2E2E3D] transition-all duration-200 ${isDragging ? 'shadow-2xl scale-[1.02]' : ''} ${!section.visible ? 'opacity-40' : ''} ${expanded ? 'border-l-[3px] border-l-[#6C63FF]' : ''}`}
    >
      <div className="flex items-center justify-between p-4 bg-[#1A1A24] rounded-xl">
        <div className="flex items-center space-x-3">
          {/* Drag Handle */}
          <div {...attributes} {...listeners} className="cursor-grab hover:text-[#6C63FF] text-[#8B8A9F] px-1 py-2 rounded focus:outline-none">
            <GripVertical size={20} />
          </div>
          <h3 className={`font-semibold text-[#F1F0FF] capitalize ${!section.visible ? 'line-through text-[#8B8A9F]' : ''}`}>
            {section.type}
          </h3>
        </div>
        
        <div className="flex items-center space-x-2 text-[#8B8A9F]">
          <button onClick={handleToggleVis} className="hover:text-[#F1F0FF] transition-colors p-1" title="Toggle Visibility">
            {section.visible ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
          
          {confirmDelete ? (
            <div className="flex items-center space-x-2 text-sm ml-2 font-medium">
              <span className="text-red-400">Sure?</span>
              <button onClick={handleDelete} className="hover:text-white">Yes</button>
              <button onClick={() => setConfirmDelete(false)} className="hover:text-white">No</button>
            </div>
          ) : (
            <button onClick={() => setConfirmDelete(true)} className="hover:text-red-400 transition-colors p-1" title="Delete">
              <Trash2 size={18} />
            </button>
          )}

          <div className="w-px h-4 bg-[#2E2E3D] mx-2" />
          
          <button onClick={() => setExpanded(!expanded)} className="hover:text-[#F1F0FF] transition-colors p-1" title="Edit">
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>
      
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 border-t border-[#2E2E3D]">
              {Editor ? <Editor section={section} /> : <p className="text-[#8B8A9F] italic">Editor pending implementation...</p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
