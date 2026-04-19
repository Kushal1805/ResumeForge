import React from 'react';

export const getFontFamily = (pair) => {
  switch (pair) {
    case 'merriweather-lato': return { heading: '"Merriweather", serif', body: '"Lato", sans-serif' };
    case 'playfair-sourcesans': return { heading: '"Playfair Display", serif', body: '"Source Sans 3", sans-serif' };
    case 'inter-roboto':
    default: return { heading: '"Inter", sans-serif', body: '"Roboto", sans-serif' };
  }
};

export default function TplSidebar({ state }) {
  const { meta, sections } = state;
  const fonts = getFontFamily(meta.fontPair);
  const headerSection = sections.find(s => s.type === 'header')?.data || {};
  
  const sidebarTypes = ['skills', 'languages', 'certifications'];
  const sidebarSections = sections.filter(s => sidebarTypes.includes(s.type) && s.visible);
  const mainSections = sections.filter(s => !sidebarTypes.includes(s.type) && s.type !== 'header' && s.visible);

  return (
    <div style={{ width: '794px', minHeight: '1123px', display: 'flex', fontFamily: fonts.body, fontSize: '13px', lineHeight: '1.5', color: '#111827', backgroundColor: '#FFFFFF', boxSizing: 'border-box' }}>
      {/* Sidebar */}
      <div style={{ width: '35%', backgroundColor: meta.accentColor, color: '#FFFFFF', padding: '32px 24px' }}>
        <h1 style={{ fontFamily: fonts.heading, fontSize: '32px', fontWeight: 'bold', lineHeight: '1.1', marginBottom: '8px' }}>{headerSection.name || 'Unnamed'}</h1>
        {headerSection.title && <div style={{ fontSize: '15px', marginBottom: '32px', opacity: 0.9 }}>{headerSection.title}</div>}
        
        <h2 style={{ fontFamily: fonts.heading, fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', paddingBottom: '4px', borderBottom: '1px solid rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>Contact</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', marginBottom: '32px', opacity: 0.9 }}>
          {headerSection.email && <div>{headerSection.email}</div>}
          {headerSection.phone && <div>{headerSection.phone}</div>}
          {headerSection.location && <div>{headerSection.location}</div>}
          {headerSection.linkedin && <div>{headerSection.linkedin}</div>}
          {headerSection.github && <div>{headerSection.github}</div>}
          {headerSection.website && <div>{headerSection.website}</div>}
        </div>

        {sidebarSections.map(sec => (
          <div key={sec.id} style={{ marginBottom: '24px' }}>
            <h2 style={{ fontFamily: fonts.heading, fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', paddingBottom: '4px', borderBottom: '1px solid rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>{sec.type}</h2>
            {sec.type === 'skills' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {sec.data?.categories?.map(cat => (
                  <div key={cat.id}>
                    <div style={{ fontWeight: 'bold', fontSize: '13px' }}>{cat.label}</div>
                    <div style={{ opacity: 0.9, fontSize: '12px' }}>{cat.skills?.join(', ')}</div>
                  </div>
                ))}
              </div>
            )}
            {sec.type === 'languages' && sec.data?.items?.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                <span>{item.language}</span><span style={{ opacity: 0.8 }}>{item.proficiency}</span>
              </div>
            ))}
            {sec.type === 'certifications' && sec.data?.items?.map(item => (
              <div key={item.id} style={{ marginBottom: '8px' }}>
                <div style={{ fontWeight: 'bold', fontSize: '12px' }}>{item.name}</div>
                <div style={{ opacity: 0.8, fontSize: '11px' }}>{item.issuer} {item.date && `• ${item.date}`}</div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Main Area */}
      <div style={{ width: '65%', padding: '32px 24px' }}>
        {mainSections.map(sec => (
          <div key={sec.id} style={{ marginBottom: '24px', pageBreakInside: 'avoid' }}>
            <h2 style={{ fontFamily: fonts.heading, fontSize: '18px', fontWeight: 'bold', color: meta.accentColor, borderBottom: `2px solid ${meta.accentColor}20`, paddingBottom: '4px', marginBottom: '16px', textTransform: 'uppercase' }}>
              {sec.type === 'custom' ? (sec.data?.sectionTitle || 'Custom') : sec.type}
            </h2>
            <div style={{ fontSize: '13px' }}>
              {sec.type === 'summary' && <p style={{ margin: 0, lineHeight: 1.6 }}>{sec.data?.text}</p>}
              
              {sec.type === 'experience' && sec.data?.items?.map(item => (
                <div key={item.id} style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                    <span style={{ color: '#111827' }}>{item.role}</span>
                    <span style={{ fontSize: '12px', color: '#6B7280' }}>{item.startDate && `${item.startDate} - ${item.endDate}`}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontStyle: 'italic', color: '#4B5563' }}>
                    <span>{item.company}</span>
                    <span style={{ fontSize: '12px' }}>{item.location}</span>
                  </div>
                  {item.bullets && item.bullets.length > 0 && (
                    <ul style={{ margin: 0, paddingLeft: '16px', listStyleType: 'disc', color: '#374151' }}>
                      {item.bullets.map((b, i) => <li key={i} style={{ marginBottom: '4px' }}>{b}</li>)}
                    </ul>
                  )}
                </div>
              ))}

              {sec.type === 'education' && sec.data?.items?.map(item => (
                <div key={item.id} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                    <span>{item.degree}</span>
                    <span style={{ fontSize: '12px', color: '#6B7280' }}>{item.startDate && `${item.startDate} - ${item.endDate}`}</span>
                  </div>
                  <div style={{ fontStyle: 'italic', marginBottom: '4px', color: '#4B5563' }}>{item.institution}</div>
                  {(item.gpa || item.honors) && (
                    <div style={{ fontSize: '12px', color: '#6B7280' }}>
                      {item.gpa && <span>GPA: {item.gpa} </span>} {item.honors && <span>| {item.honors}</span>}
                    </div>
                  )}
                </div>
              ))}

              {sec.type === 'projects' && sec.data?.items?.map(item => (
                <div key={item.id} style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                    <span>{item.name}</span>
                    <span style={{ color: meta.accentColor }}>{item.techStack}</span>
                  </div>
                  {item.description && <div style={{ fontSize: '12px', marginBottom: '8px', color: '#4B5563', fontStyle: 'italic' }}>{item.description}</div>}
                  {item.bullets && item.bullets.length > 0 && (
                    <ul style={{ margin: 0, paddingLeft: '16px', listStyleType: 'disc', color: '#374151' }}>
                      {item.bullets.map((b, i) => <li key={i} style={{ marginBottom: '4px' }}>{b}</li>)}
                    </ul>
                  )}
                </div>
              ))}
              
              {sec.type === 'custom' && sec.data?.items?.map(item => (
                <div key={item.id} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                    <span>{item.title}</span><span style={{ color: '#6B7280', fontSize: '12px' }}>{item.subtitle}</span>
                  </div>
                  <div style={{ marginTop: '4px', color: '#374151' }}>{item.body}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
