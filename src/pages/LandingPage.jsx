import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useResume } from '../context/ResumeContext';
import { useNavigate } from 'react-router-dom';

const templates = [
  {
    id: 'tpl-sidebar',
    name: 'Sidebar',
    desc: 'Polished split layout',
    colors: ['#1F3E5A', '#E2E8F0']
  },
  {
    id: 'tpl-timeline-left',
    name: 'Timeline Left',
    desc: 'Modern edge-border timeline',
    colors: ['#7A9648', '#E2E8F0']
  },
  {
    id: 'tpl-bordered',
    name: 'Bordered',
    desc: 'Structured boxed design',
    colors: ['#2A3F54', '#E2E8F0']
  },
  {
    id: 'tpl-clean',
    name: 'Clean Header',
    desc: 'Bold minimalist headers',
    colors: ['#6CA6C1', '#F8FAFC']
  },
  {
    id: 'tpl-right-sidebar',
    name: 'Timeline Right',
    desc: 'Creative profile circles',
    colors: ['#8B3A26', '#F8FAFC']
  },
  {
    id: 'ats',
    name: 'ATS Optimized',
    desc: 'Maximum parsing accuracy',
    colors: ['#000000', '#FFFFFF']
  }
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

export default function LandingPage() {
  const { dispatch } = useResume();
  const navigate = useNavigate();
  const hasSavedState = !!localStorage.getItem('resumeState');

  const handleSelectTemplate = (id) => {
    dispatch({ type: 'SET_TEMPLATE', payload: id });
    const tplConf = templates.find(t => t.id === id);
    if (tplConf && id !== 'ats') dispatch({ type: 'SET_ACCENT_COLOR', payload: tplConf.colors[0] });
    navigate('/builder');
  };

  return (
    <div className="min-h-screen bg-[#0F0F13] text-[#F1F0FF] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#6C63FF] opacity-10 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#34D399] opacity-10 rounded-full blur-[100px]" />

      {hasSavedState && (
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => navigate('/builder')}
          className="absolute top-6 right-6 px-4 py-2 border border-[#2E2E3D] bg-[#1A1A24] hover:bg-[#2E2E3D] text-[#F1F0FF] rounded-lg transition-colors z-10"
        >
          Continue Editing &rarr;
        </motion.button>
      )}

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center z-10 mb-16"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-[#6C63FF]">
          ResumeForge Pro
        </h1>
        <p className="text-xl md:text-2xl text-[#8B8A9F] font-medium max-w-xl mx-auto">
          Build. Drag. Export. Get Hired.
        </p>
        <motion.p 
          className="text-lg text-[#F1F0FF] mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Build a beautiful resume in minutes
        </motion.p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8 z-10 max-w-6xl w-full"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } }
        }}
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
