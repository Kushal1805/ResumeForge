import React from 'react';
import { getFontFamily } from './TplSidebar';

export default function TplTimelineLeft({ state }) {
  const { meta, sections } = state;
  const fonts = getFontFamily(meta.fontPair);
  const headerSection = sections.find(s => s.type === 'header')?.data || {};

  return (
    <div style={{ width: '794px', minHeight: '1123px', fontFamily: fonts.body, fontSize: '13px', lineHeight: '1.5', color: '#111827', backgroundColor: '#FFFFFF', boxSizing: 'border-box', position: 'relative', overflow: 'hidden' }}>
      
      {/* Thick Left Edge */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '40px', height: '100%', backgroundColor: meta.accentColor }} />

      <div style={{ padding: '40px 40px 40px 60px' }}>
        {/* Header */}
        <div style={{ paddingLeft: '40px', marginBottom: '40px' }}>
          <h1 style={{ fontFamily: fonts.heading, fontSize: '36px', fontWeight: 'bold', color: meta.accentColor, margin: '0 0 8px 0' }}>{headerSection.name || 'Unnamed'}</h1>
          {headerSection.title && <div style={{ fontSize: '16px', color: '#4B5563', marginBottom: '16px' }}>{headerSection.title}</div>}
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '12px', color: '#4B5563' }}>
            {headerSection.location && <span>📍 {headerSection.location}</span>}
            {headerSection.phone && <span>📞 {headerSection.phone}</span>}
            {headerSection.email && <span>✉️ {headerSection.email}</span>}
            {headerSection.linkedin && <span>🔗 {headerSection.linkedin}</span>}
            {headerSection.website && <span>🌐 {headerSection.website}</span>}
          </div>
        </div>

        {/* Sections Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Timeline Line */}
          <div style={{ position: 'absolute', left: '16px', top: '10px', bottom: '10px', width: '2px', backgroundColor: '#E5E7EB', zIndex: 1 }} />

          {sections.filter(s => s.type !== 'header' && s.visible).map(sec => (
            <div key={sec.id} style={{ position: 'relative', paddingLeft: '44px', marginBottom: '32px', pageBreakInside: 'avoid' }}>
              
              {/* Category Icon / Circle */}
              <div style={{ position: 'absolute', left: '5px', top: '2px', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: meta.accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, border: '4px solid #FFFFFF' }}>
                <div style={{ width: '8px', height: '8px', backgroundColor: '#FFFFFF', borderRadius: '50%' }} />
              </div>

              <h2 style={{ fontFamily: fonts.heading, fontSize: '18px', fontWeight: 'bold', color: meta.accentColor, marginBottom: '16px', textTransform: 'capitalize' }}>
                {sec.type === 'custom' ? (sec.data?.sectionTitle || 'Custom') : sec.type}
              </h2>

              <div style={{ fontSize: '13px' }}>
                {sec.type === 'summary' && <p style={{ margin: 0, color: '#374151' }}>{sec.data?.text}</p>}

                {(sec.type === 'experience' || sec.type === 'education' || sec.type === 'projects') && sec.data?.items?.map(item => (
                  <div key={item.id} style={{ marginBottom: '16px', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '-36px', top: '6px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#9CA3AF', zIndex: 2, border: '2px solid #FFFFFF' }} />
                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) auto', gap: '12px', alignItems: 'baseline', marginBottom: '4px' }}>
                      <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#111827' }}>{item.role || item.degree || item.name}</div>
                      <div style={{ fontSize: '12px', color: '#6B7280', fontWeight: '500' }}>{item.startDate && `${item.startDate} - ${item.endDate}`}</div>
                    </div>
                    <div style={{ fontWeight: '600', color: '#4B5563', marginBottom: '8px' }}>
                      {item.company || item.institution || item.techStack} {item.location && <span style={{ fontWeight: 'normal', color: '#9CA3AF' }}>• {item.location}</span>}
                    </div>
                    {item.description && <div style={{ fontSize: '12px', marginBottom: '8px', fontStyle: 'italic', color: '#4B5563' }}>{item.description}</div>}
                    {item.bullets && item.bullets.length > 0 && (
                      <ul style={{ margin: 0, paddingLeft: '16px', listStyleType: 'circle', color: '#4B5563' }}>
                        {item.bullets.map((b, i) => <li key={i} style={{ marginBottom: '4px' }}>{b}</li>)}
                      </ul>
                    )}
                  </div>
                ))}

                {sec.type === 'skills' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {sec.data?.categories?.map(cat => (
                      <div key={cat.id} style={{ display: 'flex', alignItems: 'baseline' }}>
                        <div style={{ fontWeight: 'bold', width: '150px', color: '#374151' }}>{cat.label}</div>
                        <div style={{ color: '#4B5563', flex: 1 }}>{cat.skills?.join(', ')}</div>
                      </div>
                    ))}
                  </div>
                )}

                {sec.type === 'languages' && (
                  <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                    {sec.data?.items?.map(item => (
                      <div key={item.id}>
                        <span style={{ fontWeight: 'bold', marginRight: '8px' }}>{item.language}</span>
                        <span style={{ color: '#6B7280' }}>{item.proficiency}</span>
                      </div>
                    ))}
                  </div>
                )}

                {sec.type === 'certifications' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {sec.data?.items?.map(item => (
                      <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <div style={{ fontWeight: 'bold', color: '#374151' }}>{item.name}</div>
                        <div style={{ color: '#6B7280' }}>{item.issuer} {item.date && `(${item.date})`}</div>
                      </div>
                    ))}
                  </div>
                )}
                
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
    </div>
  );
}
