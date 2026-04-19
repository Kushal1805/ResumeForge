import React from 'react';
import { getFontFamily } from './ClassicTemplate';

export default function MinimalTemplate({ state }) {
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
        padding: '16mm 20mm',
        boxSizing: 'border-box',
        fontFamily: fonts.body,
        fontSize: '13px',
        lineHeight: '1.6'
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: fonts.heading, fontSize: '36px', fontWeight: '300', margin: '0 0 8px 0', color: meta.accentColor }}>
          {headerSection.name || 'Unnamed'}
        </h1>
        {headerSection.title && <div style={{ fontSize: '15px', letterSpacing: '0.5px', marginBottom: '12px', textTransform: 'uppercase', color: '#6B7280' }}>
          {headerSection.title}
        </div>}
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '12px', color: '#4B5563', paddingBottom: '16px', borderBottom: '1px solid #E5E7EB' }}>
          {headerSection.email && <span>{headerSection.email}</span>}
          {headerSection.phone && <span>{headerSection.phone}</span>}
          {headerSection.location && <span>{headerSection.location}</span>}
          {headerSection.linkedin && <span>{headerSection.linkedin}</span>}
          {headerSection.github && <span>{headerSection.github}</span>}
          {headerSection.website && <span>{headerSection.website}</span>}
        </div>
      </div>

      {/* Sections Body */}
      {sections.filter(s => s.type !== 'header' && s.visible).map(sec => {
        return (
          <div key={sec.id} style={{ marginBottom: '24px', pageBreakInside: 'avoid' }}>
            {/* Section Header */}
            <h2 style={{ 
              fontFamily: fonts.heading, 
              fontSize: '12px', 
              fontWeight: 'bold', 
              textTransform: 'uppercase', 
              letterSpacing: '2px', 
              color: '#9CA3AF',
              marginBottom: '16px'
            }}>
              {sec.type === 'custom' ? (sec.data?.sectionTitle || 'Custom') : sec.type}
            </h2>

            {/* Section Content */}
            <div style={{ fontSize: '13px' }}>
              {sec.type === 'summary' && (
                <p style={{ margin: 0 }}>{sec.data?.text}</p>
              )}

              {sec.type === 'experience' && sec.data?.items?.map(item => (
                <div key={item.id} style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px', gap: '8px' }}>
                    <div style={{ fontWeight: '600', color: '#111827', fontSize: '14px' }}>{item.role}</div>
                    <div style={{ textAlign: 'right', color: '#6B7280', fontSize: '12px' }}>{item.startDate && `${item.startDate} - ${item.endDate}`}</div>
                  </div>
                  <div style={{ color: meta.accentColor, marginBottom: '8px' }}>{item.company} {item.location && <span style={{color: '#9CA3AF'}}>• {item.location}</span>}</div>
                  
                  {item.bullets && item.bullets.length > 0 && (
                    <ul style={{ margin: 0, paddingLeft: '16px', listStyleType: 'circle', color: '#4B5563' }}>
                      {item.bullets.map((b, i) => <li key={i} style={{ marginBottom: '4px' }}>{b}</li>)}
                    </ul>
                  )}
                </div>
              ))}

              {sec.type === 'education' && sec.data?.items?.map(item => (
                <div key={item.id} style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px', gap: '8px' }}>
                    <div style={{ fontWeight: '600', color: '#111827' }}>{item.degree}</div>
                    <div style={{ textAlign: 'right', color: '#6B7280', fontSize: '12px' }}>{item.startDate && `${item.startDate} - ${item.endDate}`}</div>
                  </div>
                  <div style={{ color: meta.accentColor, marginBottom: '4px' }}>{item.institution}</div>
                  {(item.gpa || item.honors) && (
                    <div style={{ fontSize: '12px', color: '#6B7280' }}>
                      {item.gpa && <span>GPA: {item.gpa} </span>}
                      {item.honors && <span>| {item.honors}</span>}
                    </div>
                  )}
                </div>
              ))}

              {sec.type === 'skills' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
                  {sec.data?.categories?.map(cat => (
                    <div key={cat.id} style={{ display: 'flex' }}>
                      <span style={{ fontWeight: '600', minWidth: '120px', color: '#111827' }}>{cat.label}</span>
                      <span style={{ color: '#4B5563' }}>{cat.skills?.join(', ')}</span>
                    </div>
                  ))}
                </div>
              )}

              {sec.type === 'projects' && sec.data?.items?.map(item => (
                <div key={item.id} style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'baseline' }}>
                    <div style={{ fontWeight: '600', color: '#111827', fontSize: '14px' }}>{item.name}</div>
                    <div style={{ color: meta.accentColor, fontSize: '12px' }}>{item.techStack}</div>
                    <div style={{ color: '#9CA3AF', fontSize: '11px', flex: 1, textAlign: 'right' }}>{item.link}</div>
                  </div>
                  {item.description && <div style={{ fontSize: '12px', marginBottom: '6px', color: '#6B7280' }}>{item.description}</div>}
                  {item.bullets && item.bullets.length > 0 && (
                    <ul style={{ margin: 0, paddingLeft: '16px', listStyleType: 'circle', color: '#4B5563' }}>
                      {item.bullets.map((b, i) => <li key={i} style={{ marginBottom: '4px' }}>{b}</li>)}
                    </ul>
                  )}
                </div>
              ))}

              {sec.type === 'certifications' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
                  {sec.data?.items?.map(item => (
                    <div key={item.id} style={{ display: 'flex' }}>
                      <span style={{ fontWeight: '600', minWidth: '200px', color: '#111827' }}>{item.name}</span>
                      <span style={{ color: '#4B5563', flex: 1 }}>{item.issuer}</span>
                      <span style={{ color: '#9CA3AF', fontSize: '12px' }}>{item.date}</span>
                    </div>
                  ))}
                </div>
              )}

              {sec.type === 'languages' && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
                  {sec.data?.items?.map(item => (
                    <div key={item.id}>
                      <span style={{ fontWeight: '600', color: '#111827', marginRight: '6px' }}>{item.language}</span>
                      <span style={{ color: '#6B7280' }}>{item.proficiency}</span>
                    </div>
                  ))}
                </div>
              )}

              {sec.type === 'custom' && sec.data?.items?.map(item => (
                <div key={item.id} style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div style={{ fontWeight: '600', color: '#111827', fontSize: '14px' }}>{item.title}</div>
                    <div style={{ color: '#6B7280', fontSize: '12px' }}>{item.subtitle}</div>
                  </div>
                  <div style={{ marginTop: '4px', color: '#4B5563' }}>{item.body}</div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
