import React from 'react';

// A helper to map font pairs to standard CSS font-family strings
export const getFontFamily = (pair) => {
  switch (pair) {
    case 'merriweather-lato':
      return { heading: '"Merriweather", serif', body: '"Lato", sans-serif' };
    case 'playfair-sourcesans':
      return { heading: '"Playfair Display", serif', body: '"Source Sans 3", sans-serif' };
    case 'inter-roboto':
    default:
      return { heading: '"Inter", sans-serif', body: '"Roboto", sans-serif' };
  }
};

export default function ClassicTemplate({ state }) {
  const { meta, sections } = state;
  const fonts = getFontFamily(meta.fontPair);
  
  const headerSection = sections.find(s => s.type === 'header')?.data || {};
  
  return (
    <div 
      id="resume-preview" 
      style={{ 
        width: '794px', 
        minHeight: '1123px', 
        backgroundColor: '#FFFFFF', 
        color: '#111827', 
        padding: '12mm 15mm',
        boxSizing: 'border-box',
        fontFamily: fonts.body,
        fontSize: '14px',
        lineHeight: '1.5'
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <h1 style={{ fontFamily: fonts.heading, fontSize: '28px', fontWeight: 'bold', margin: '0 0 4px 0', color: '#000000' }}>
          {headerSection.name || 'Unnamed'}
        </h1>
        {headerSection.title && <div style={{ fontSize: '16px', fontWeight: '500', marginBottom: '4px' }}>{headerSection.title}</div>}
        
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', fontSize: '12px', color: '#4B5563' }}>
          {headerSection.email && <span>{headerSection.email}</span>}
          {headerSection.phone && <><span style={{color: meta.accentColor}}>•</span><span>{headerSection.phone}</span></>}
          {headerSection.location && <><span style={{color: meta.accentColor}}>•</span><span>{headerSection.location}</span></>}
          {headerSection.linkedin && <><span style={{color: meta.accentColor}}>•</span><span>{headerSection.linkedin}</span></>}
          {headerSection.github && <><span style={{color: meta.accentColor}}>•</span><span>{headerSection.github}</span></>}
          {headerSection.website && <><span style={{color: meta.accentColor}}>•</span><span>{headerSection.website}</span></>}
        </div>
      </div>

      {/* Sections Body */}
      {sections.filter(s => s.type !== 'header' && s.visible).map(sec => {
        return (
          <div key={sec.id} style={{ marginBottom: '16px', pageBreakInside: 'avoid' }}>
            {/* Section Header */}
            <h2 style={{ 
              fontFamily: fonts.heading, 
              fontSize: '14px', 
              fontWeight: 'bold', 
              textTransform: 'uppercase', 
              letterSpacing: '1px', 
              borderBottom: `2px solid ${meta.accentColor}`,
              paddingBottom: '2px',
              marginBottom: '8px',
              color: '#000000'
            }}>
              {sec.type === 'custom' ? (sec.data?.sectionTitle || 'Custom') : sec.type}
            </h2>

            {/* Section Content */}
            <div style={{ fontSize: '13px' }}>
              {sec.type === 'summary' && (
                <p style={{ margin: 0 }}>{sec.data?.text}</p>
              )}

              {sec.type === 'experience' && sec.data?.items?.map(item => (
                <div key={item.id} style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', color: '#111827' }}>
                    <span>{item.company}</span>
                    <span style={{ fontWeight: 'normal' }}>{item.startDate && `${item.startDate} - ${item.endDate}`}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontStyle: 'italic', marginBottom: '4px' }}>
                    <span>{item.role}</span>
                    <span style={{ fontSize: '12px' }}>{item.location}</span>
                  </div>
                  {item.bullets && item.bullets.length > 0 && (
                    <ul style={{ margin: 0, paddingLeft: '16px', listStyleType: 'disc' }}>
                      {item.bullets.map((b, i) => <li key={i}>{b}</li>)}
                    </ul>
                  )}
                </div>
              ))}

              {sec.type === 'education' && sec.data?.items?.map(item => (
                <div key={item.id} style={{ marginBottom: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                    <span>{item.institution}</span>
                    <span>{item.startDate && `${item.startDate} - ${item.endDate}`}</span>
                  </div>
                  <div style={{ fontStyle: 'italic' }}>{item.degree}</div>
                  {(item.gpa || item.honors) && (
                    <div style={{ fontSize: '12px', marginTop: '2px' }}>
                      {item.gpa && <span>GPA: {item.gpa} </span>}
                      {item.honors && <span>| {item.honors}</span>}
                    </div>
                  )}
                </div>
              ))}

              {sec.type === 'skills' && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px' }}>
                  {sec.data?.categories?.map(cat => (
                    <div key={cat.id} style={{ display: 'flex', width: '100%', marginBottom: '2px' }}>
                      <span style={{ fontWeight: 'bold', minWidth: '100px' }}>{cat.label}: </span>
                      <span>{cat.skills?.join(', ')}</span>
                    </div>
                  ))}
                </div>
              )}

              {sec.type === 'projects' && sec.data?.items?.map(item => (
                <div key={item.id} style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                    <span>{item.name} {item.link && <span style={{fontWeight:'normal', fontSize:'12px', color: meta.accentColor}}> - {item.link}</span>}</span>
                    <span style={{ fontStyle: 'italic', fontWeight: 'normal', fontSize: '12px' }}>{item.techStack}</span>
                  </div>
                  {item.description && <div style={{ fontSize: '12px', marginBottom: '4px' }}>{item.description}</div>}
                  {item.bullets && item.bullets.length > 0 && (
                    <ul style={{ margin: 0, paddingLeft: '16px', listStyleType: 'disc' }}>
                      {item.bullets.map((b, i) => <li key={i}>{b}</li>)}
                    </ul>
                  )}
                </div>
              ))}

              {sec.type === 'certifications' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {sec.data?.items?.map(item => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span><strong>{item.name}</strong>, {item.issuer}</span>
                      <span>{item.date}</span>
                    </div>
                  ))}
                </div>
              )}

              {sec.type === 'languages' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
                  {sec.data?.items?.map(item => (
                    <div key={item.id}>
                      <strong>{item.language}</strong>: {item.proficiency}
                    </div>
                  ))}
                </div>
              )}

              {sec.type === 'custom' && sec.data?.items?.map(item => (
                <div key={item.id} style={{ marginBottom: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                    <span>{item.title}</span>
                    <span style={{ fontWeight: 'normal', fontStyle: 'italic' }}>{item.subtitle}</span>
                  </div>
                  <div style={{ marginTop: '2px' }}>{item.body}</div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
