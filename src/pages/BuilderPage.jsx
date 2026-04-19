import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { useAuth } from '../context/AuthContext';
import { getResume } from '../services/firestoreService';
import Toolbar from '../components/builder/Toolbar';
import SectionList from '../components/builder/SectionList';
import ResumePreview from '../components/preview/ResumePreview';
import ATSScore from '../ui/ATSScore';
import ExportModal from '../ui/ExportModal';
import AddSectionModal from '../ui/AddSectionModal';
import { Plus, Loader2 } from 'lucide-react';

export default function BuilderPage() {
  const { resumeId } = useParams();
  const { state, dispatch, setCurrentResumeId, setUserId } = useResume();
  const { currentUser } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showAddSectionModal, setShowAddSectionModal] = useState(false);
  const [ready, setReady] = useState(false);

  // Load resume from Firestore on mount
  useEffect(() => {
    if (!currentUser || !resumeId) return;

    setUserId(currentUser.uid);
    setCurrentResumeId(resumeId);

    let cancelled = false;

    getResume(currentUser.uid, resumeId)
      .then(resume => {
        if (cancelled) return;
        if (resume && resume.meta && resume.sections) {
          dispatch({ type: 'LOAD_STATE', payload: { meta: resume.meta, sections: resume.sections } });
        }
        // Even if resume is null (just created from dashboard), state was already set via dispatch before navigate
        setReady(true);
      })
      .catch(err => {
        console.error('Failed to load resume:', err);
        // Still mark as ready — the Dashboard already loaded state before navigating
        if (!cancelled) setReady(true);
      });

    return () => { cancelled = true; };
  }, [currentUser?.uid, resumeId]);

  if (!ready || !state?.meta || !state?.sections) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0F0F13]">
        <div className="flex items-center space-x-3 text-[#F1F0FF]">
          <Loader2 className="animate-spin text-[#6C63FF]" size={28} />
          <span className="text-lg font-medium">Loading your resume...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col md:flex-row h-screen overflow-hidden ${isDarkMode ? 'bg-[#0F0F13]' : 'bg-gray-100'} transition-colors`}>
      {/* Left Pane - Editor */}
      <div className={`w-full md:w-[45%] lg:w-[40%] flex flex-col h-full border-r ${isDarkMode ? 'border-[#2E2E3D]' : 'border-gray-200'} z-10 custom-scrollbar overflow-y-auto`}>
        <Toolbar isDarkMode={isDarkMode} onToggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
        
        <div className="p-4 space-y-6">
          <ATSScore />
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className={`font-bold text-lg ${isDarkMode ? 'text-[#F1F0FF]' : 'text-gray-800'}`}>Edit Sections</h2>
            </div>
            
            <SectionList />

            <button 
              onClick={() => setShowAddSectionModal(true)}
              className="w-full py-4 border-2 border-dashed border-[#2E2E3D] text-[#8B8A9F] hover:text-[#6C63FF] hover:border-[#6C63FF] rounded-xl flex flex-col items-center justify-center transition-all mt-4"
            >
              <Plus size={24} className="mb-2" />
              <span className="font-medium">Add New Section</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Pane - Preview */}
      <div className={`hidden md:block md:w-[55%] lg:w-[60%] h-full relative ${isDarkMode ? 'bg-[#16161D]' : 'bg-gray-200'} custom-scrollbar overflow-y-auto`}>
        <ResumePreview onShowExportModal={() => setShowExportModal(true)} />
      </div>

      {/* Modals */}
      {showExportModal && <ExportModal onClose={() => setShowExportModal(false)} />}
      {showAddSectionModal && <AddSectionModal onClose={() => setShowAddSectionModal(false)} />}
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: ${isDarkMode ? '#0F0F13' : '#F3F4F6'}; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: ${isDarkMode ? '#2E2E3D' : '#D1D5DB'}; border-radius: 4px; }
      `}</style>
    </div>
  );
}
