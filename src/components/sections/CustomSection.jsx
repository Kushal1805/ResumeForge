import React from 'react';
import { useResume } from '../../context/ResumeContext';
import InlineEdit from '../../ui/InlineEdit';
import { Plus, X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export default function CustomSection({ section }) {
  const { dispatch } = useResume();
  const items = section.data?.items || [];
  
  const handleAdd = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { sectionId: section.id, item: { id: uuidv4(), title: '', subtitle: '', body: '' } }
    });
  };

  const handleUpdate = (itemId, updates) => {
    dispatch({ type: 'UPDATE_ITEM', payload: { sectionId: section.id, itemId, data: updates } });
  };

  const handleRemove = (itemId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { sectionId: section.id, itemId } });
  };

  const handleTitleChange = (v) => {
    dispatch({ type: 'UPDATE_SECTION_DATA', payload: { sectionId: section.id, data: { sectionTitle: v } } });
  };

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <label className="text-xs text-[#8B8A9F] uppercase tracking-wider block mb-1">Custom Section Title</label>
        <InlineEdit value={section.data?.sectionTitle || section.type} onChange={handleTitleChange} placeholder="Awards, Publications..." className="text-xl text-[#F1F0FF] font-bold block" />
      </div>

      {items.map((item) => (
        <div key={item.id} className="relative group p-4 border border-[#2E2E3D] rounded-lg bg-[#16161D]">
          <button 
            onClick={() => handleRemove(item.id)} 
            className="absolute top-2 right-2 p-1 text-[#8B8A9F] hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X size={16} />
          </button>
          
          <div className="mb-2">
            <InlineEdit value={item.title} onChange={(v) => handleUpdate(item.id, { title: v })} placeholder="Item Title" className="text-[#F1F0FF] font-semibold text-base block" />
            <InlineEdit value={item.subtitle} onChange={(v) => handleUpdate(item.id, { subtitle: v })} placeholder="Subtitle / Date" className="text-[#8B8A9F] text-sm block mt-1" />
          </div>
          
          <InlineEdit value={item.body} onChange={(v) => handleUpdate(item.id, { body: v })} placeholder="Description of this item..." multiline={true} className="text-[#F1F0FF] text-sm block mt-3" />
        </div>
      ))}
      
      <button 
        onClick={handleAdd}
        className="flex items-center justify-center w-full py-3 border-2 border-dashed border-[#2E2E3D] text-[#8B8A9F] hover:border-[#6C63FF] hover:text-[#6C63FF] rounded-lg transition-colors"
      >
        <Plus size={18} className="mr-2" />
        Add Item
      </button>
    </div>
  );
}
