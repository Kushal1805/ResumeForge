import React from 'react';
import { getFontFamily } from './TplSidebar';

export default function TplBordered({ state }) {
  const { meta, sections } = state;
  const fonts = getFontFamily(meta.fontPair);
  const headerSection = sections.find(s => s.type === 'header')?.data || {};
  
  const sidebarTypes = ['skills', 'languages', 'certifications'];
  const sidebarSections = sections.filter(s => sidebarTypes.includes(s.type) && s.visible);
  const mainSections = sections.filter(s => !sidebarTypes.includes(s.type) && s.type !== 'header' && s.visible);

  return (
    <div style={{ width: '794px', minHeight: '1123px', padding: '16px', backgroundColor: '#FFFFFF', boxSizing: 'border-box' }}>
      <div style={{ border: `12px solid ${meta.accentColor}`, minHeight: '100%', display: 'flex', boxSizing: 'border-box', fontFamily: fonts.body, fontSize: '13px', lineHeight: '1.5', color: '#111827' }}>
        
        {/* Left Column (Thin) */}
        <div style={{ width: '30%', borderRight: '1px solid #E5E7EB', padding: '32px 20px', backgroundColor: '#F9FAFB' }}>
          <h2 style={{ fontFamily: fonts.heading, fontSize: '16px', fontWeight: 'bold', color: meta.accentColor, marginBottom: '16px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: meta.accentColor, display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontSize: '12px' }}>✉</div> Contact
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px', marginBottom: '32px', color: '#4B5563' }}>
            {headerSection.email && <div>{headerSection.email}</div>}
            {headerSection.phone && <div>{headerSection.phone}</div>}
            {headerSection.location && <div>{headerSection.location}</div>}
            {headerSection.linkedin && <div style={{ wordBreak: 'break-all' }}>{headerSection.linkedin}</div>}
            {headerSection.website && <div style={{ wordBreak: 'break-all' }}>{headerSection.website}</div>}
          </div>

          {sidebarSections.map(sec => (
            <div key={sec.id} style={{ marginBottom: '24px' }}>
              <h2 style={{ fontFamily: fonts.heading, fontSize: '16px', fontWeight: 'bold', color: meta.accentColor, marginBottom: '16px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: meta.accentColor, display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontSize: '12px' }}>★</div> {sec.type}
              </h2>
              {sec.type === 'skills' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {sec.data?.categories?.map(cat => (
                    <div key={cat.id}>
                      <div style={{ fontWeight: 'bold', fontSize: '13px', color: '#111827' }}>{cat.label}</div>
                      <div style={{ color: '#4B5563', fontSize: '12px' }}>{cat.skills?.join(' • ')}</div>
                    </div>
                  ))}
                </div>
              )}
              {sec.type === 'languages' && sec.data?.items?.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 'bold' }}>{item.language}</span><span style={{ color: '#6B7280' }}>{item.proficiency}</span>
                </div>
              ))}
              {sec.type === 'certifications' && sec.data?.items?.map(item => (
                <div key={item.id} style={{ marginBottom: '10px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '12px' }}>{item.name}</div>
                  <div style={{ color: '#6B7280', fontSize: '11px' }}>{item.issuer} {item.date && `• ${item.date}`}</div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Right Main Column */}
        <div style={{ width: '70%', padding: '32px 32px' }}>
          <div style={{ marginBottom: '40px' }}>
            <h1 style={{ fontFamily: fonts.heading, fontSize: '42px', fontWeight: 'bold', color: meta.accentColor, lineHeight: '1.1', marginBottom: '8px' }}>{headerSection.name || 'Unnamed'}</h1>
            {headerSection.title && <div style={{ fontSize: '18px', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '1px' }}>{headerSection.title}</div>}
          </div>

          {mainSections.map(sec => (
            <div key={sec.id} style={{ marginBottom: '28px', pageBreakInside: 'avoid' }}>
              <h2 style={{ fontFamily: fonts.heading, fontSize: '18px', fontWeight: 'bold', color: meta.accentColor, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid #E5E7EB', paddingBottom: '8px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: meta.accentColor, display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#FFFFFF', justifySelf: 'flex-start' }}>■</div>
                {sec.type === 'custom' ? (sec.data?.sectionTitle || 'Custom') : sec.type}
              </h2>

              <div style={{ fontSize: '13px', paddingLeft: '4px' }}>
                {sec.type === 'summary' && <p style={{ margin: 0, color: '#374151' }}>{sec.data?.text}</p>}

                {(sec.type === 'experience' || sec.type === 'education' || sec.type === 'projects') && sec.data?.items?.map(item => (
                  <div key={item.id} style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) auto', alignItems: 'baseline', marginBottom: '4px' }}>
                      <div style={{ fontWeight: 'bold', fontSize: '15px', color: '#111827' }}>{item.role || item.degree || item.name}</div>
                      <div style={{ fontSize: '12px', color: '#6B7280', fontWeight: '600' }}>{item.startDate && `${item.startDate} - ${item.endDate}`}</div>
                    </div>
                    <div style={{ fontWeight: '500', color: meta.accentColor, marginBottom: '6px' }}>
                      {item.company || item.institution || item.techStack} {item.location && <span style={{ color: '#9CA3AF' }}>• {item.location}</span>}
                    </div>
                    {item.description && <div style={{ fontSize: '12px', marginBottom: '6px', color: '#4B5563' }}>{item.description}</div>}
                    {item.bullets && item.bullets.length > 0 && (
                      <ul style={{ margin: 0, paddingLeft: '16px', listStyleType: 'square', color: '#374151' }}>
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
    </div>
  );
}
