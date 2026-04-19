import React from 'react';
import { useResume } from '../../context/ResumeContext';
import InlineEdit from '../../ui/InlineEdit';
import { Plus, X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export default function LanguagesSection({ section }) {
  const { dispatch } = useResume();
  const items = section.data?.items || [];

  const handleAdd = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { sectionId: section.id, item: { id: uuidv4(), language: '', proficiency: '' } }
    });
  };

  const handleUpdate = (itemId, updates) => {
    dispatch({ type: 'UPDATE_ITEM', payload: { sectionId: section.id, itemId, data: updates } });
  };

  const handleRemove = (itemId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { sectionId: section.id, itemId } });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item.id} className="relative group p-3 border border-[#2E2E3D] rounded-lg bg-[#16161D] flex items-center justify-between">
            <div className="flex-1">
              <InlineEdit value={item.language} onChange={(v) => handleUpdate(item.id, { language: v })} placeholder="Language" className="text-[#F1F0FF] font-semibold text-base block" />
              <InlineEdit value={item.proficiency} onChange={(v) => handleUpdate(item.id, { proficiency: v })} placeholder="Native, Fluent..." className="text-[#8B8A9F] text-sm block" />
            </div>
            
            <button 
              onClick={() => handleRemove(item.id)} 
              className="p-1 text-[#8B8A9F] hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity ml-2"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
      
      <button 
        onClick={handleAdd}
        className="flex items-center justify-center w-full py-3 border-2 border-dashed border-[#2E2E3D] text-[#8B8A9F] hover:border-[#6C63FF] hover:text-[#6C63FF] rounded-lg transition-colors"
      >
        <Plus size={18} className="mr-2" />
        Add Language
      </button>
    </div>
  );
}
