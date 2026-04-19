import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Undo, Redo, Moon, Sun, LogOut, ArrowLeft } from 'lucide-react';
import CompletenessBar from './CompletenessBar';

const ACCENT_COLORS = ['#1F3E5A', '#7A9648', '#2A3F54', '#6CA6C1', '#8B3A26', '#1E293B'];

export default function Toolbar({ isDarkMode, onToggleDarkMode }) {
  const { state, dispatch, canUndo, canRedo } = useResume();
  const { template, accentColor, fontPair } = state.meta;
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="bg-[#1A1A24] border-b border-[#2E2E3D] p-4 space-y-4 shadow-sm sticky top-0 z-20">
      {/* Row 1 */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center space-x-2 text-[#8B8A9F] hover:text-[#F1F0FF] transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
          <span className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-[#6C63FF]">ResumeForge</span>
        </button>
        <div className="flex items-center space-x-2">
          {currentUser && (
            <div className="flex items-center mr-2">
              {currentUser.photoURL ? (
                <img src={currentUser.photoURL} alt="Profile" className="w-6 h-6 rounded-full" />
              ) : (
                <div className="w-6 h-6 bg-[#6C63FF] rounded-full text-xs flex items-center justify-center text-white font-bold">
                  {currentUser.email?.[0].toUpperCase()}
                </div>
              )}
              <button onClick={handleLogout} className="p-1.5 ml-2 rounded text-[#8B8A9F] hover:text-red-400 hover:bg-[#2E2E3D]" title="Log Out">
                <LogOut size={18} />
              </button>
              <div className="w-px h-5 bg-[#2E2E3D] mx-2" />
            </div>
          )}
          <button 
            onClick={() => dispatch({ type: 'UNDO' })} 
            disabled={!canUndo}
            className="p-1.5 rounded text-[#8B8A9F] hover:text-[#F1F0FF] hover:bg-[#2E2E3D] disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#8B8A9F] transition-colors"
            title="Undo (Ctrl+Z)"
          >
            <Undo size={18} />
          </button>
          <button 
            onClick={() => dispatch({ type: 'REDO' })} 
            disabled={!canRedo}
            className="p-1.5 rounded text-[#8B8A9F] hover:text-[#F1F0FF] hover:bg-[#2E2E3D] disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#8B8A9F] transition-colors"
            title="Redo (Ctrl+Y)"
          >
            <Redo size={18} />
          </button>
          <div className="w-px h-5 bg-[#2E2E3D] mx-1" />
          <button 
            onClick={onToggleDarkMode} 
            className="p-1.5 rounded text-[#8B8A9F] hover:text-[#F1F0FF] hover:bg-[#2E2E3D] transition-colors"
            title="Toggle Dark Mode"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-2 gap-3">
        <select 
          value={template} 
          onChange={(e) => dispatch({ type: 'SET_TEMPLATE', payload: e.target.value })}
          className="bg-[#2E2E3D] text-[#F1F0FF] text-sm rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-[#6C63FF]"
        >
          <option value="tpl-sidebar">Sidebar</option>
          <option value="tpl-timeline-left">Timeline Left</option>
          <option value="tpl-bordered">Bordered</option>
          <option value="tpl-clean">Clean</option>
          <option value="tpl-right-sidebar">Timeline Right</option>
          <option value="ats">ATS Optimized</option>
        </select>
        
        <select 
          value={fontPair} 
          onChange={(e) => dispatch({ type: 'SET_FONT_PAIR', payload: e.target.value })}
          className="bg-[#2E2E3D] text-[#F1F0FF] text-sm rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-[#6C63FF]"
        >
          <option value="inter-roboto">Inter / Roboto</option>
          <option value="merriweather-lato">Merriweather / Lato</option>
          <option value="playfair-sourcesans">Playfair / Source Sans</option>
        </select>
      </div>

      {/* Row 3 - Accent Colors */}
      <div className="flex justify-between items-center bg-[#0F0F13] p-2 rounded-lg border border-[#2E2E3D]">
        {ACCENT_COLORS.map(color => (
          <button
            key={color}
            onClick={() => dispatch({ type: 'SET_ACCENT_COLOR', payload: color })}
            className={`w-6 h-6 rounded-full transition-all duration-200 ${accentColor === color ? 'ring-2 ring-white ring-offset-2 ring-offset-[#0F0F13] scale-110' : 'hover:scale-110 opacity-80 hover:opacity-100'}`}
            style={{ backgroundColor: color }}
            title={`Set Accent Color to ${color}`}
          />
        ))}
      </div>

      {/* Row 4 */}
      <CompletenessBar />
    </div>
  );
}
