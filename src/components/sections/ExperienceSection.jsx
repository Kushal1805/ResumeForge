import React from 'react';
import { useResume } from '../../context/ResumeContext';
import InlineEdit from '../../ui/InlineEdit';
import SortableBullets from '../../ui/SortableBullets';
import { Plus, X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export default function ExperienceSection({ section }) {
  const { dispatch } = useResume();
  const items = section.data?.items || [];

  const handleAdd = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { sectionId: section.id, item: { id: uuidv4(), company: '', role: '', startDate: '', endDate: '', location: '', bullets: [] } }
    });
  };

  const handleUpdate = (itemId, updates) => {
    dispatch({
      type: 'UPDATE_ITEM',
      payload: { sectionId: section.id, itemId, data: updates }
    });
  };

  const handleRemove = (itemId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { sectionId: section.id, itemId } });
  };

  return (
    <div className="space-y-6">
      {items.map((item, idx) => (
        <div key={item.id} className="relative group p-4 border border-[#2E2E3D] rounded-lg bg-[#16161D]">
          <button 
            onClick={() => handleRemove(item.id)} 
            className="absolute top-2 right-2 p-1 text-[#8B8A9F] hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X size={16} />
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            <div>
              <InlineEdit value={item.role} onChange={(v) => handleUpdate(item.id, { role: v })} placeholder="Job Title" className="text-[#F1F0FF] font-semibold text-base block" />
              <InlineEdit value={item.company} onChange={(v) => handleUpdate(item.id, { company: v })} placeholder="Company Name" className="text-[#6C63FF] text-sm font-medium block mt-1" />
            </div>
            <div className="md:text-right space-y-1">
              <div className="flex md:justify-end items-center space-x-2 text-sm text-[#8B8A9F]">
                <InlineEdit value={item.startDate} onChange={(v) => handleUpdate(item.id, { startDate: v })} placeholder="Start Date" className="w-[80px]" />
                <span>-</span>
                <InlineEdit value={item.endDate} onChange={(v) => handleUpdate(item.id, { endDate: v })} placeholder="End Date" className="w-[80px]" />
              </div>
              <InlineEdit value={item.location} onChange={(v) => handleUpdate(item.id, { location: v })} placeholder="Location" className="text-sm text-[#8B8A9F] block" />
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
        Add Experience
      </button>
    </div>
  );
}
