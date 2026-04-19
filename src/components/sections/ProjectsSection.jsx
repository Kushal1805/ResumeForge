import React from 'react';
import { useResume } from '../../context/ResumeContext';
import InlineEdit from '../../ui/InlineEdit';
import SortableBullets from '../../ui/SortableBullets';
import { Plus, X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export default function ProjectsSection({ section }) {
  const { dispatch } = useResume();
  const items = section.data?.items || [];

  const handleAdd = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { sectionId: section.id, item: { id: uuidv4(), name: '', description: '', techStack: '', link: '', bullets: [] } }
    });
  };

  const handleUpdate = (itemId, updates) => {
    dispatch({ type: 'UPDATE_ITEM', payload: { sectionId: section.id, itemId, data: updates } });
  };

  const handleRemove = (itemId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { sectionId: section.id, itemId } });
  };

  return (
    <div className="space-y-6">
      {items.map((item) => (
        <div key={item.id} className="relative group p-4 border border-[#2E2E3D] rounded-lg bg-[#16161D]">
          <button 
            onClick={() => handleRemove(item.id)} 
            className="absolute top-2 right-2 p-1 text-[#8B8A9F] hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X size={16} />
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            <div>
              <InlineEdit value={item.name} onChange={(v) => handleUpdate(item.id, { name: v })} placeholder="Project Name" className="text-[#F1F0FF] font-semibold text-base block" />
              <InlineEdit value={item.description} onChange={(v) => handleUpdate(item.id, { description: v })} placeholder="Short Description" className="text-[#8B8A9F] text-sm block mt-1" />
            </div>
            <div className="md:text-right space-y-1">
              <InlineEdit value={item.link} onChange={(v) => handleUpdate(item.id, { link: v })} placeholder="github.com/link" className="text-[#6C63FF] text-sm block" />
              <div className="text-sm text-[#8B8A9F]">
                Tech: <InlineEdit value={item.techStack} onChange={(v) => handleUpdate(item.id, { techStack: v })} placeholder="React, Node..." className="text-[#F1F0FF]" />
              </div>
            </div>
          </div>

          <SortableBullets 
            bullets={item.bullets} 
            sectionId={section.id} 
            itemId={item.id} 
            dispatch={dispatch}
            onUpdate={(newBullets) => handleUpdate(item.id, { bullets: newBullets })}
          />
        </div>
      ))}
      
      <button 
        onClick={handleAdd}
        className="flex items-center justify-center w-full py-3 border-2 border-dashed border-[#2E2E3D] text-[#8B8A9F] hover:border-[#6C63FF] hover:text-[#6C63FF] rounded-lg transition-colors"
      >
        <Plus size={18} className="mr-2" />
        Add Project
      </button>
    </div>
  );
}
