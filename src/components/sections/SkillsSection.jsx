import React from 'react';
import { useResume } from '../../context/ResumeContext';
import InlineEdit from '../../ui/InlineEdit';
import { Plus, X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export default function SkillsSection({ section }) {
  const { dispatch } = useResume();
  const categories = section.data?.categories || [];

  const updateCategories = (newCats) => {
    dispatch({ type: 'UPDATE_SECTION_DATA', payload: { sectionId: section.id, data: { categories: newCats } } });
  };

  const handleAdd = () => {
    updateCategories([...categories, { id: uuidv4(), label: '', skills: [] }]);
  };

  const handleRemove = (catId) => {
    updateCategories(categories.filter(c => c.id !== catId));
  };

  const handleUpdateLabel = (catId, newLabel) => {
    updateCategories(categories.map(c => c.id === catId ? { ...c, label: newLabel } : c));
  };

  const handleAddSkill = (catId) => {
    updateCategories(categories.map(c => {
      if (c.id === catId) return { ...c, skills: [...c.skills, ''] };
      return c;
    }));
  };

  const handleUpdateSkill = (catId, skillIdx, newSkill) => {
    updateCategories(categories.map(c => {
      if (c.id === catId) {
        const newArr = [...c.skills];
        newArr[skillIdx] = newSkill;
        return { ...c, skills: newArr };
      }
      return c;
    }));
  };

  const handleRemoveSkill = (catId, skillIdx) => {
    updateCategories(categories.map(c => {
      if (c.id === catId) {
        return { ...c, skills: c.skills.filter((_, idx) => idx !== skillIdx) };
      }
      return c;
    }));
  };

  return (
    <div className="space-y-4">
      {categories.map((cat) => (
        <div key={cat.id} className="relative group p-4 border border-[#2E2E3D] rounded-lg bg-[#16161D]">
          <button 
            onClick={() => handleRemove(cat.id)} 
            className="absolute top-2 right-2 p-1 text-[#8B8A9F] hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X size={16} />
          </button>
          
          <div className="mb-3">
            <InlineEdit value={cat.label} onChange={(v) => handleUpdateLabel(cat.id, v)} placeholder="Category (e.g. Languages)" className="text-[#F1F0FF] font-semibold text-sm uppercase tracking-wider block" />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {cat.skills.map((skill, idx) => (
              <div key={idx} className="flex items-center px-3 py-1 bg-[#2E2E3D] rounded-full group/skill">
                <InlineEdit value={skill} onChange={(v) => handleUpdateSkill(cat.id, idx, v)} placeholder="Skill" className="text-sm text-[#F1F0FF]" />
                <button onClick={() => handleRemoveSkill(cat.id, idx)} className="ml-1 opacity-0 group-hover/skill:opacity-100 text-[#8B8A9F] hover:text-red-400 focus:opacity-100 transition-opacity">
                  <X size={14} />
                </button>
              </div>
            ))}
            <button onClick={() => handleAddSkill(cat.id)} className="flex items-center px-2 py-1 border border-dashed border-[#8B8A9F] text-[#8B8A9F] hover:text-[#6C63FF] hover:border-[#6C63FF] rounded-full text-sm transition-colors">
              <Plus size={14} className="mr-1" /> Add
            </button>
          </div>
        </div>
      ))}
      
      <button 
        onClick={handleAdd}
        className="flex items-center justify-center w-full py-3 border-2 border-dashed border-[#2E2E3D] text-[#8B8A9F] hover:border-[#6C63FF] hover:text-[#6C63FF] rounded-lg transition-colors"
      >
        <Plus size={18} className="mr-2" />
        Add Category
      </button>
    </div>
  );
}
