import React, { useRef } from 'react';
import { useResume } from '../../context/ResumeContext';
import { useAuth } from '../../context/AuthContext';
import { saveResume } from '../../services/firestoreService';
import ATSFriendlyTemplate from './templates/ATSFriendlyTemplate';
import TplSidebar from './templates/TplSidebar';
import TplTimelineLeft from './templates/TplTimelineLeft';
import TplBordered from './templates/TplBordered';
import TplClean from './templates/TplClean';
import TplRightSidebar from './templates/TplRightSidebar';
import { Download, Share2, Save, Check } from 'lucide-react';
import { exportResumePDF } from '../../utils/exportPDF';

export default function ResumePreview({ onShowExportModal }) {
  const { state, currentResumeId } = useResume();
  const { currentUser } = useAuth();
  const template = state.meta.template;
  const [exporting, setExporting] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [saved, setSaved] = React.useState(false);

  const handleExport = async () => {
    setExporting(true);
    try {
      const name = state.sections.find(s => s.type === 'header')?.data?.name || 'Resume';
      await exportResumePDF(name);
      onShowExportModal();
    } catch (e) {
      console.error(e);
      alert('Export failed. Please check console.');
    } finally {
      setExporting(false);
    }
  };

  const handleShare = () => {
    const hash = btoa(JSON.stringify(state));
    window.location.hash = hash;
    navigator.clipboard.writeText(window.location.href);
    alert('Share link copied to clipboard!');
  };

  const handleSave = async () => {
    if (!currentUser || !currentResumeId) return;
    setSaving(true);
    try {
      await saveResume(currentUser.uid, currentResumeId, { meta: state.meta, sections: state.sections });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error('Save error:', err);
    }
    setSaving(false);
  };

  let TemplateComponent = TplSidebar;
  if (template === 'ats') TemplateComponent = ATSFriendlyTemplate;
  if (template === 'tpl-sidebar') TemplateComponent = TplSidebar;
  if (template === 'tpl-timeline-left') TemplateComponent = TplTimelineLeft;
  if (template === 'tpl-bordered') TemplateComponent = TplBordered;
  if (template === 'tpl-clean') TemplateComponent = TplClean;
  if (template === 'tpl-right-sidebar') TemplateComponent = TplRightSidebar;

  return (
    <div className="relative w-full h-full flex flex-col pt-4 items-center bg-[#F3F4F6]">
      {/* Top Toolbar */}
      <div className="absolute top-4 right-8 z-10 flex space-x-3">
        <button 
          onClick={handleSave}
          disabled={saving}
          className={`flex items-center px-4 py-2 font-medium rounded-lg shadow-sm transition-all ${
            saved 
              ? 'bg-green-500 text-white border border-green-500' 
              : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          {saved ? <Check size={18} className="mr-2" /> : <Save size={18} className="mr-2" />}
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save'}
        </button>
        <button 
          onClick={handleShare}
          className="flex items-center px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
        >
          <Share2 size={18} className="mr-2" /> Share
        </button>
        <button 
          onClick={handleExport}
          disabled={exporting}
          className="flex items-center px-6 py-2 bg-[#6C63FF] text-white font-medium rounded-lg shadow-md hover:bg-[#5A52E0] transition-colors disabled:opacity-70 group overflow-hidden relative"
        >
          <div className="absolute inset-0 w-full h-full gradient-pulse opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)', transform: 'skewX(-20deg)', animation: exporting ? 'slide 1.5s infinite' : 'none' }} />
          <Download size={18} className="mr-2" /> 
          {exporting ? 'Exporting...' : 'Export PDF'}
        </button>
      </div>

      {/* Styled animation for button */}
      <style>{`
        @keyframes slide {
          0% { transform: translateX(-100%) skewX(-20deg); }
          100% { transform: translateX(200%) skewX(-20deg); }
        }
      `}</style>

      {/* Scaled Preview Wrapper */}
      <div className="mt-16 sm:mt-12 overflow-visible origin-top lg:scale-[0.8] xl:scale-[0.9] md:scale-[0.6] scale-[0.35] transition-transform flex-1 flex flex-col items-center">
        <div id="resume-preview" className="bg-white shadow-2xl relative" style={{ width: '794px', minHeight: '1123px' }}>
          <TemplateComponent state={state} />
          
          {/* Faint A4 boundary line (1123px height) to show page breaks */}
          <div className="absolute left-0 right-0 border-b border-dashed border-red-300 w-full" style={{ top: '1123px', height: '1px' }} title="Page Break (A4)" />
        </div>
      </div>
    </div>
  );
}
