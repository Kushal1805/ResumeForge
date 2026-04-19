import React from 'react';
import { getFontFamily } from './ClassicTemplate';

export default function ModernTemplate({ state }) {
  const { meta, sections } = state;
  const fonts = getFontFamily(meta.fontPair);
  
  const headerSection = sections.find(s => s.type === 'header')?.data || {};
  
  // Categorize sections for sidebar/main layout
  const sidebarTypes = ['skills', 'languages', 'certifications'];
  const sidebarSections = sections.filter(s => sidebarTypes.includes(s.type) && s.visible);
  const mainSections = sections.filter(s => !sidebarTypes.includes(s.type) && s.type !== 'header' && s.visible);

  return (
    <div 
      id="resume-preview" 
      style={{ 
        width: '794px', 
        minHeight: '1123px', 
        backgroundColor: '#FFFFFF', 
        display: 'flex',
        fontFamily: fonts.body,
        fontSize: '13px',
        lineHeight: '1.5',
        boxSizing: 'border-box'
      }}
    >
      {/* Left Sidebar */}
      <div style={{ 
        width: '30%', 
        backgroundColor: meta.accentColor, 
        color: '#FFFFFF', 
        padding: '12mm 6mm',
        minHeight: '100%',
      }}>
        {/* Contact Info */}
        <h1 style={{ fontFamily: fonts.heading, fontSize: '26px', fontWeight: 'bold', margin: '0 0 4px 0', lineHeight: 1.1 }}>
          {headerSection.name || 'Unnamed'}
        </h1>
        {headerSection.title && <div style={{ fontSize: '14px', marginBottom: '24px', opacity: 0.9 }}>{headerSection.title}</div>}
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', marginBottom: '32px', opacity: 0.9 }}>
          {headerSection.email && <div>{headerSection.email}</div>}
          {headerSection.phone && <div>{headerSection.phone}</div>}
          {headerSection.location && <div>{headerSection.location}</div>}
          {headerSection.linkedin && <div>{headerSection.linkedin}</div>}
        </div>

        {/* Sidebar Sections */}
        {sidebarSections.map(sec => (
          <div key={sec.id} style={{ marginBottom: '24px' }}>
            <h2 style={{ 
              fontFamily: fonts.heading, fontSize: '14px', fontWeight: 'bold', 
              textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid rgba(255,255,255,0.3)',
              paddingBottom: '4px', marginBottom: '12px'
            }}>
              {sec.type}
            </h2>
            
            {sec.type === 'skills' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {sec.data?.categories?.map(cat => (
                  <div key={cat.id}>
                    <div style={{ fontWeight: 'bold', marginBottom: '2px', fontSize: '12px' }}>{cat.label}</div>
                    <div style={{ opacity: 0.85, fontSize: '11px', lineHeight: '1.6' }}>{cat.skills?.join(', ')}</div>
                  </div>
                ))}
              </div>
            )}

            {sec.type === 'languages' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {sec.data?.items?.map(item => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                    <span>{item.language}</span>
                    <span style={{ opacity: 0.8 }}>{item.proficiency}</span>
                  </div>
                ))}
              </div>
            )}

            {sec.type === 'certifications' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {sec.data?.items?.map(item => (
                  <div key={item.id}>
                    <div style={{ fontWeight: 'bold', fontSize: '12px' }}>{item.name}</div>
                    <div style={{ opacity: 0.85, fontSize: '11px' }}>{item.issuer} • {item.date}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div style={{ width: '70%', padding: '12mm 15mm', color: '#111827' }}>
        {mainSections.map(sec => (
          <div key={sec.id} style={{ marginBottom: '20px', pageBreakInside: 'avoid' }}>
            <h2 style={{ 
              fontFamily: fonts.heading, fontSize: '16px', fontWeight: 'bold', 
              textTransform: 'uppercase', borderLeft: `3px solid ${meta.accentColor}`,
              paddingLeft: '8px', marginBottom: '12px', color: '#000000'
            }}>
              {sec.type === 'custom' ? (sec.data?.sectionTitle || 'Custom') : sec.type}
            </h2>

            <div style={{ fontSize: '13px' }}>
              {sec.type === 'summary' && (
                <p style={{ margin: 0, lineHeight: 1.6 }}>{sec.data?.text}</p>
              )}

              {sec.type === 'experience' && sec.data?.items?.map(item => (
                <div key={item.id} style={{ marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', color: '#111827' }}>
                    <span>{item.role}</span>
                    <span style={{ color: meta.accentColor, fontSize: '12px' }}>{item.startDate && `${item.startDate} - ${item.endDate}`}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontWeight: '600' }}>{item.company}</span>
                    <span style={{ fontSize: '12px', color: '#6B7280' }}>{item.location}</span>
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
                    <span style={{ color: meta.accentColor, fontSize: '12px' }}>{item.startDate && `${item.startDate} - ${item.endDate}`}</span>
                  </div>
                  <div style={{ fontWeight: '600', marginBottom: '2px' }}>{item.institution}</div>
                  {(item.gpa || item.honors) && (
                    <div style={{ fontSize: '12px', color: '#4B5563' }}>
                      {item.gpa && <span>GPA: {item.gpa} </span>}
                      {item.honors && <span>| {item.honors}</span>}
                    </div>
                  )}
                </div>
              ))}

              {sec.type === 'projects' && sec.data?.items?.map(item => (
                <div key={item.id} style={{ marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                    <span>{item.name}</span>
                    <span style={{ color: meta.accentColor, fontSize: '12px', fontWeight: '500' }}>{item.techStack}</span>
                  </div>
                  {item.description && <div style={{ fontSize: '12px', marginBottom: '6px', fontStyle: 'italic' }}>{item.description}</div>}
                  {item.bullets && item.bullets.length > 0 && (
                    <ul style={{ margin: 0, paddingLeft: '16px', listStyleType: 'disc', color: '#374151' }}>
                      {item.bullets.map((b, i) => <li key={i} style={{ marginBottom: '4px' }}>{b}</li>)}
                    </ul>
                  )}
                </div>
              ))}

              {sec.type === 'custom' && sec.data?.items?.map(item => (
                <div key={item.id} style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                    <span>{item.title}</span>
                    <span style={{ color: '#6B7280', fontSize: '12px' }}>{item.subtitle}</span>
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
