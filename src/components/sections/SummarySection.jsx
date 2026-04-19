import React from 'react';
import { useResume } from '../../context/ResumeContext';
import InlineEdit from '../../ui/InlineEdit';

export default function SummarySection({ section }) {
  const { dispatch } = useResume();
  const { data } = section;

  const handleChange = (value) => {
    dispatch({
      type: 'UPDATE_SECTION_DATA',
      payload: { sectionId: section.id, data: { text: value } }
    });
  };

  const textLength = data.text?.length || 0;
  const isOptimal = textLength >= 300 && textLength <= 600;

  return (
    <div className="space-y-3">
      <InlineEdit 
        value={data.text || ''} 
        onChange={handleChange} 
        placeholder="Write a brief professional summary..." 
        multiline={true}
        className="w-full text-[#F1F0FF] leading-relaxed min-h-[100px]"
      />
      
      <div className="flex justify-between items-center text-xs">
        <span className={`${isOptimal ? 'text-green-400' : 'text-[#8B8A9F]'}`}>
          {textLength} characters
        </span>
        <span className="text-[#8B8A9F]">Recommended: 300-600</span>
      </div>
    </div>
  );
}
