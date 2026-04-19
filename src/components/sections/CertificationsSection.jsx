import React from 'react';
import { useResume } from '../../context/ResumeContext';
import InlineEdit from '../../ui/InlineEdit';
import { Plus, X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export default function CertificationsSection({ section }) {
  const { dispatch } = useResume();
  const items = section.data?.items || [];

  const handleAdd = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { sectionId: section.id, item: { id: uuidv4(), name: '', issuer: '', date: '', link: '' } }
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
      {items.map((item) => (
        <div key={item.id} className="relative group p-4 border border-[#2E2E3D] rounded-lg bg-[#16161D] flex flex-col md:flex-row gap-4 items-start md:items-center">
          <button 
            onClick={() => handleRemove(item.id)} 
            className="absolute top-2 right-2 p-1 text-[#8B8A9F] hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X size={16} />
          </button>
          
          <div className="flex-1 w-full">
            <InlineEdit value={item.name} onChange={(v) => handleUpdate(item.id, { name: v })} placeholder="Certification Name" className="text-[#F1F0FF] font-semibold text-base block" />
            <InlineEdit value={item.issuer} onChange={(v) => handleUpdate(item.id, { issuer: v })} placeholder="Issuer (e.g. AWS)" className="text-[#8B8A9F] text-sm block mt-1" />
          </div>
          <div className="w-full md:w-auto md:text-right flex flex-col items-start md:items-end pr-6">
            <InlineEdit value={item.date} onChange={(v) => handleUpdate(item.id, { date: v })} placeholder="Date (e.g. Jan 2023)" className="text-sm text-[#F1F0FF] block" />
            <InlineEdit value={item.link} onChange={(v) => handleUpdate(item.id, { link: v })} placeholder="Credential URL" className="text-[#6C63FF] text-xs block mt-1" />
          </div>
        </div>
      ))}
      
      <button 
        onClick={handleAdd}
        className="flex items-center justify-center w-full py-3 border-2 border-dashed border-[#2E2E3D] text-[#8B8A9F] hover:border-[#6C63FF] hover:text-[#6C63FF] rounded-lg transition-colors"
      >
        <Plus size={18} className="mr-2" />
        Add Certification
      </button>
    </div>
  );
}
