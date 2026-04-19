import React from 'react';
import { getFontFamily } from './TplSidebar';

export default function TplClean({ state }) {
  const { meta, sections } = state;
  const fonts = getFontFamily(meta.fontPair);
  const headerSection = sections.find(s => s.type === 'header')?.data || {};

  return (
    <div style={{ width: '794px', minHeight: '1123px', padding: '40px 48px', backgroundColor: '#FFFFFF', boxSizing: 'border-box', fontFamily: fonts.body, fontSize: '13px', lineHeight: '1.5', color: '#111827' }}>
      {/* Header spanning top */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontFamily: fonts.heading, fontSize: '40px', fontWeight: 'bold', color: meta.accentColor, margin: '0 0 12px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: `3px solid ${meta.accentColor}40`, paddingBottom: '16px' }}>
          <span>{headerSection.name || 'Unnamed'}</span>
          {headerSection.title && <span style={{ fontSize: '18px', fontWeight: 'normal', color: '#4B5563' }}>{headerSection.title}</span>}
        </h1>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap', fontSize: '12px', color: '#4B5563', backgroundColor: `${meta.accentColor}10`, padding: '12px 16px', borderRadius: '8px' }}>
          {headerSection.location && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}> <span style={{ color: meta.accentColor }}>📍</span> {headerSection.location}</span>}
          {headerSection.phone && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}> <span style={{ color: meta.accentColor }}>📞</span> {headerSection.phone}</span>}
          {headerSection.email && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}> <span style={{ color: meta.accentColor }}>✉️</span> {headerSection.email}</span>}
          {headerSection.linkedin && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}> <span style={{ color: meta.accentColor }}>🔗</span> {headerSection.linkedin}</span>}
          {headerSection.website && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}> <span style={{ color: meta.accentColor }}>🌐</span> {headerSection.website}</span>}
        </div>
      </div>

      {/* Main flow */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {sections.filter(s => s.type !== 'header' && s.visible).map(sec => (
          <div key={sec.id} style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: '24px', pageBreakInside: 'avoid' }}>
            
            {/* Left label */}
            <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <div style={{ backgroundColor: meta.accentColor, color: '#FFFFFF', padding: '6px 16px', borderRadius: '24px', fontWeight: 'bold', display: 'inline-block', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {sec.type === 'custom' ? (sec.data?.sectionTitle || 'Custom') : sec.type}
              </div>
            </div>

            {/* Right content */}
            <div>
              {sec.type === 'summary' && <p style={{ margin: 0, color: '#374151', fontSize: '13px' }}>{sec.data?.text}</p>}

              {(sec.type === 'experience' || sec.type === 'education' || sec.type === 'projects') && sec.data?.items?.map((item, idx) => (
                <div key={item.id} style={{ marginBottom: idx === sec.data.items.length -1 ? '0' : '20px' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                     <span style={{ fontWeight: 'bold', fontSize: '15px' }}>{item.role || item.degree || item.name}</span>
                     <span style={{ color: '#6B7280', fontSize: '12px', fontWeight: '500' }}>{item.startDate && `${item.startDate} - ${item.endDate}`}</span>
                   </div>
                   <div style={{ color: meta.accentColor, fontWeight: '600', marginBottom: '6px' }}>
                     {item.company || item.institution || item.techStack} {item.location && <span style={{ color: '#9CA3AF', fontWeight: 'normal' }}>| {item.location}</span>}
                   </div>
                   {item.description && <div style={{ fontSize: '12px', color: '#4B5563', marginBottom: '6px' }}>{item.description}</div>}
                   {item.bullets && item.bullets.length > 0 && (
                     <ul style={{ margin: 0, paddingLeft: '16px', listStyleType: 'disc', color: '#4B5563', fontSize: '13px' }}>
                       {item.bullets.map((b, i) => <li key={i} style={{ marginBottom: '4px' }}>{b}</li>)}
                     </ul>
                   )}
                </div>
              ))}

              {sec.type === 'skills' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
                  {sec.data?.categories?.map(cat => (
                    <div key={cat.id} style={{ display: 'flex' }}>
                       <div style={{ fontWeight: 'bold', width: '130px', color: '#374151' }}>{cat.label}</div>
                       <div style={{ flex: 1, color: '#4B5563' }}>{cat.skills?.join(', ')}</div>
                    </div>
                  ))}
                </div>
              )}

              {sec.type === 'languages' && (
                <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                  {sec.data?.items?.map(item => (
                    <div key={item.id}>
                      <span style={{ fontWeight: 'bold', marginRight: '6px', color: '#374151' }}>{item.language}</span>
                      <span style={{ color: '#6B7280' }}>{item.proficiency}</span>
                    </div>
                  ))}
                </div>
              )}

              {sec.type === 'certifications' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
                  {sec.data?.items?.map(item => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 'bold', color: '#374151' }}>{item.name}</span>
                      <span style={{ color: '#6B7280' }}>{item.issuer} {item.date && `(${item.date})`}</span>
                    </div>
                  ))}
                </div>
              )}
              
              {sec.type === 'custom' && sec.data?.items?.map(item => (
                <div key={item.id} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', color: '#374151' }}>
                    <span>{item.title}</span><span style={{ color: '#6B7280', fontSize: '12px' }}>{item.subtitle}</span>
                  </div>
                  <div style={{ marginTop: '4px', color: '#4B5563' }}>{item.body}</div>
                </div>
              ))}
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}
