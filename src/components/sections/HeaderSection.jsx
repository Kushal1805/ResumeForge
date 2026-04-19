import React from 'react';
import { useResume } from '../../context/ResumeContext';
import InlineEdit from '../../ui/InlineEdit';
import { Mail, Phone, MapPin, Globe, Link } from 'lucide-react';

export default function HeaderSection({ section }) {
  const { dispatch } = useResume();
  const { data } = section;

  const handleChange = (field) => (value) => {
    dispatch({
      type: 'UPDATE_SECTION_DATA',
      payload: { sectionId: section.id, data: { [field]: value } }
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-[#8B8A9F] mb-1 uppercase tracking-wider">Full Name</label>
          <InlineEdit 
            value={data.name} 
            onChange={handleChange('name')} 
            placeholder="John Doe" 
            className="text-lg font-semibold text-[#F1F0FF] block"
          />
        </div>
        <div>
          <label className="block text-xs text-[#8B8A9F] mb-1 uppercase tracking-wider">Job Title</label>
          <InlineEdit 
            value={data.title} 
            onChange={handleChange('title')} 
            placeholder="Software Engineer" 
            className="text-lg text-[#F1F0FF] block"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <div className="flex items-center space-x-2 text-[#8B8A9F]">
          <Mail size={16} />
          <InlineEdit value={data.email} onChange={handleChange('email')} placeholder="Email" className="flex-1" />
        </div>
        <div className="flex items-center space-x-2 text-[#8B8A9F]">
          <Phone size={16} />
          <InlineEdit value={data.phone} onChange={handleChange('phone')} placeholder="Phone" className="flex-1" />
        </div>
        <div className="flex items-center space-x-2 text-[#8B8A9F]">
          <MapPin size={16} />
          <InlineEdit value={data.location} onChange={handleChange('location')} placeholder="Location" className="flex-1" />
        </div>
        <div className="flex items-center space-x-2 text-[#8B8A9F]">
          <Link size={16} />
          <InlineEdit value={data.linkedin} onChange={handleChange('linkedin')} placeholder="LinkedIn URL" className="flex-1" />
        </div>
        <div className="flex items-center space-x-2 text-[#8B8A9F]">
          <Link size={16} />
          <InlineEdit value={data.github} onChange={handleChange('github')} placeholder="GitHub URL" className="flex-1" />
        </div>
        <div className="flex items-center space-x-2 text-[#8B8A9F]">
          <Globe size={16} />
          <InlineEdit value={data.website} onChange={handleChange('website')} placeholder="Website URL" className="flex-1" />
        </div>
      </div>
    </div>
  );
}
