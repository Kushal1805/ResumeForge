import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useResume } from '../context/ResumeContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserResumes, createResume, deleteResume } from '../services/firestoreService';
import { seedData } from '../data/seedData';
import { LogOut, Plus, Trash2, Clock, FileText, Loader2 } from 'lucide-react';

const templates = [
  { id: 'tpl-sidebar', name: 'Sidebar', desc: 'Polished split layout', colors: ['#1F3E5A', '#E2E8F0'] },
  { id: 'tpl-timeline-left', name: 'Timeline Left', desc: 'Modern edge-border timeline', colors: ['#7A9648', '#E2E8F0'] },
  { id: 'tpl-bordered', name: 'Bordered', desc: 'Structured boxed design', colors: ['#2A3F54', '#E2E8F0'] },
  { id: 'tpl-clean', name: 'Clean Header', desc: 'Bold minimalist headers', colors: ['#6CA6C1', '#F8FAFC'] },
  { id: 'tpl-right-sidebar', name: 'Timeline Right', desc: 'Creative profile circles', colors: ['#8B3A26', '#F8FAFC'] },
  { id: 'ats', name: 'ATS Optimized', desc: 'Maximum parsing accuracy', colors: ['#000000', '#FFFFFF'] }
];

function TemplateCard({ tpl, onClick }) {
  const cardRef = useRef(null);
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };
  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex flex-col items-center p-6 bg-[#1A1A24] rounded-2xl border border-[#2E2E3D] shadow-lg cursor-pointer transition-all duration-200 hover:border-[#6C63FF] hover:shadow-[0_8px_30px_rgba(108,99,255,0.2)]"
      style={{ transition: 'transform 0.1s ease-out, border 0.2s, box-shadow 0.2s' }}
      whileHover={{ scale: 1.05 }}
      onClick={() => onClick(tpl.id)}
    >
      <div className="w-48 h-64 bg-white rounded flex flex-col p-4 space-y-3 mb-6 relative overflow-hidden pointer-events-none">
        <div className="w-1/2 h-4 rounded-sm" style={{ backgroundColor: tpl.colors[0] }} />
        <div className="flex space-x-2">
          {tpl.id !== 'ats' && <div className="w-1/3 h-20 rounded-sm" style={{ backgroundColor: tpl.colors[0], opacity: 0.2 }} />}
          <div className="flex-1 space-y-2">
            <div className="w-full h-2 rounded-sm bg-gray-200" />
            <div className="w-5/6 h-2 rounded-sm bg-gray-200" />
            <div className="w-full h-2 rounded-sm bg-gray-200" />
            <div className="w-4/6 h-2 rounded-sm bg-gray-200" />
          </div>
        </div>
        <div className="w-full h-12 rounded-sm" style={{ backgroundColor: tpl.colors[1], opacity: 0.1 }} />
      </div>
      <h3 className="text-xl font-semibold text-[#F1F0FF] mb-1">{tpl.name}</h3>
      <p className="text-[#8B8A9F] mb-6">{tpl.desc}</p>
      <button className="px-6 py-2 bg-[#6C63FF] text-white rounded-lg font-medium hover:bg-[#5A52E0] transition-colors w-full">
        Use Template
      </button>
    </motion.div>
  );
}

function SavedResumeCard({ resume, onOpen, onDelete }) {
  const tplName = templates.find(t => t.id === resume.meta?.template)?.name || resume.meta?.template || 'Unknown';
  const tplColor = templates.find(t => t.id === resume.meta?.template)?.colors[0] || '#6C63FF';
  const headerName = resume.sections?.find(s => s.type === 'header')?.data?.name || 'Untitled Resume';
  const updatedAt = resume.updatedAt?.toDate ? resume.updatedAt.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently';

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="flex items-center justify-between p-4 bg-[#1A1A24] rounded-xl border border-[#2E2E3D] hover:border-[#6C63FF] transition-all cursor-pointer group"
      onClick={() => onOpen(resume.id)}
    >
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: tplColor + '20' }}>
          <FileText size={20} style={{ color: tplColor }} />
        </div>
        <div>
          <h4 className="font-semibold text-[#F1F0FF]">{headerName}</h4>
          <div className="flex items-center space-x-3 text-xs text-[#8B8A9F] mt-1">
            <span>{tplName}</span>
            <span>•</span>
            <span className="flex items-center"><Clock size={12} className="mr-1" />{updatedAt}</span>
          </div>
        </div>
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); onDelete(resume.id); }}
        className="opacity-0 group-hover:opacity-100 p-2 text-[#8B8A9F] hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
        title="Delete Resume"
      >
        <Trash2 size={16} />
      </button>
    </motion.div>
  );
}

export default function DashboardPage() {
  const { dispatch, setCurrentResumeId, setUserId } = useResume();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const [savedResumes, setSavedResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  // Set userId in context
  useEffect(() => {
    if (currentUser) setUserId(currentUser.uid);
  }, [currentUser, setUserId]);

  // Fetch all resumes on mount
  useEffect(() => {
    if (!currentUser) return;
    setLoading(true);
    getUserResumes(currentUser.uid)
      .then(resumes => setSavedResumes(resumes))
      .catch(err => console.error('Failed to fetch resumes:', err))
      .finally(() => setLoading(false));
  }, [currentUser]);

  const handleSelectTemplate = async (templateId) => {
    if (!currentUser) return;
    setCreating(true);
    try {
      const tplConf = templates.find(t => t.id === templateId);
      const newResumeData = {
        meta: {
          ...seedData.meta,
          template: templateId,
          accentColor: tplConf && templateId !== 'ats' ? tplConf.colors[0] : seedData.meta.accentColor,
          lastSaved: new Date().toISOString()
        },
        sections: seedData.sections,
        title: 'New Resume'
      };
      const newId = await createResume(currentUser.uid, newResumeData);
      dispatch({ type: 'LOAD_STATE', payload: { meta: newResumeData.meta, sections: newResumeData.sections } });
      setCurrentResumeId(newId);
      navigate(`/builder/${newId}`);
    } catch (err) {
      console.error('Failed to create resume:', err);
    }
    setCreating(false);
  };

  const handleOpenResume = (resumeId) => {
    setCurrentResumeId(resumeId);
    navigate(`/builder/${resumeId}`);
  };

  const handleDeleteResume = async (resumeId) => {
    if (!currentUser) return;
    try {
      await deleteResume(currentUser.uid, resumeId);
      setSavedResumes(prev => prev.filter(r => r.id !== resumeId));
    } catch (err) {
      console.error('Failed to delete resume:', err);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#0F0F13] text-[#F1F0FF] flex flex-col items-center p-6 relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#6C63FF] opacity-10 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#34D399] opacity-10 rounded-full blur-[100px]" />

      {/* Header */}
      <div className="w-full max-w-6xl flex justify-end items-center py-4 z-10 mb-8">
        {currentUser && (
          <div className="flex items-center space-x-3 bg-[#1A1A24] border border-[#2E2E3D] px-4 py-2 rounded-full">
            {currentUser.photoURL ? (
              <img src={currentUser.photoURL} alt="Profile" className="w-8 h-8 rounded-full" />
            ) : (
              <div className="w-8 h-8 bg-[#6C63FF] rounded-full flex items-center justify-center text-white font-bold">
                {currentUser.email?.[0].toUpperCase()}
              </div>
            )}
            <span className="text-sm font-medium">{currentUser.displayName || currentUser.email.split('@')[0]}</span>
            <div className="w-px h-4 bg-[#2E2E3D] mx-2" />
            <button onClick={handleLogout} className="text-[#8B8A9F] hover:text-red-400 transition-colors" title="Log Out">
              <LogOut size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Title */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10 mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-[#6C63FF]">
          Your Dashboard
        </h1>
        <p className="text-[#8B8A9F]">Your resumes are saved to the cloud. Pick up where you left off or start fresh.</p>
      </motion.div>

      {/* Saved Resumes */}
      <div className="w-full max-w-6xl z-10 mb-10">
        <h2 className="text-2xl font-semibold mb-4">Your Resumes</h2>
        {loading ? (
          <div className="flex items-center justify-center py-12 text-[#8B8A9F]">
            <Loader2 className="animate-spin mr-2" size={20} /> Loading your resumes...
          </div>
        ) : savedResumes.length === 0 ? (
          <div className="text-center py-12 bg-[#1A1A24] rounded-xl border border-[#2E2E3D]">
            <FileText size={40} className="mx-auto text-[#8B8A9F] mb-3" />
            <p className="text-[#8B8A9F]">No resumes yet. Pick a template below to create your first one!</p>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {savedResumes.map(resume => (
                <SavedResumeCard key={resume.id} resume={resume} onOpen={handleOpenResume} onDelete={handleDeleteResume} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Create New */}
      <div className="w-full max-w-6xl z-10 mb-6">
        <h2 className="text-2xl font-semibold">Create New Resume</h2>
        <p className="text-[#8B8A9F] text-sm mt-1">Select a template to get started</p>
      </div>

      {creating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#1A1A24] p-8 rounded-2xl border border-[#2E2E3D] flex items-center space-x-4">
            <Loader2 className="animate-spin text-[#6C63FF]" size={24} />
            <span className="text-[#F1F0FF] font-medium">Creating your resume...</span>
          </div>
        </div>
      )}

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8 z-10 max-w-6xl w-full"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        {templates.map(tpl => (
          <motion.div key={tpl.id} variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}>
            <TemplateCard tpl={tpl} onClick={handleSelectTemplate} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
