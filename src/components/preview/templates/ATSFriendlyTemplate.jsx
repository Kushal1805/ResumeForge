import React from 'react';

export default function ATSFriendlyTemplate({ state }) {
  const { sections } = state;
  // Strict standard font for ATS compatibility
  const fontConfig = {
    fontFamily: '"Times New Roman", Times, serif',
    fontSize: '11pt',
    lineHeight: '1.5',
    color: '#000000', // STRICTLY black
  };
  
  const headerSection = sections.find(s => s.type === 'header')?.data || {};
  
  return (
    <div 
      id="resume-preview" 
      style={{ 
        width: '794px', 
        minHeight: '1123px', 
        backgroundColor: '#FFFFFF', 
        ...fontConfig,
        padding: '1in',
        boxSizing: 'border-box'
      }}
    >
      {/* ATS Header (Center aligned, Standard) */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24pt', fontWeight: 'bold', margin: '0 0 8px 0', textTransform: 'uppercase' }}>
          {headerSection.name || 'Unnamed'}
        </h1>
        
        <div style={{ fontSize: '11pt', margin: '0' }}>
          {[
            headerSection.location,
            headerSection.phone,
            headerSection.email,
            headerSection.linkedin,
            headerSection.github,
            headerSection.website
          ].filter(Boolean).join(' | ')}
        </div>
      </div>

      {/* Main Single Column Flow */}
      <div style={{ textAlign: 'left' }}>
        {sections.filter(s => s.type !== 'header' && s.visible).map(sec => {
          return (
            <div key={sec.id} style={{ marginBottom: '16px', pageBreakInside: 'avoid' }}>
              
              {/* Standard Section Heading */}
              <h2 style={{ 
                fontSize: '12pt', 
                fontWeight: 'bold', 
                textTransform: 'uppercase', 
                borderBottom: '1pt solid #000000',
                margin: '0 0 8px 0',
                paddingBottom: '2px'
              }}>
                {sec.type === 'custom' ? (sec.data?.sectionTitle || 'Custom') : sec.type}
              </h2>

              <div style={{ fontSize: '11pt' }}>
                {sec.type === 'summary' && (
                  <p style={{ margin: 0 }}>{sec.data?.text}</p>
                )}

                {sec.type === 'experience' && sec.data?.items?.map(item => (
                  <div key={item.id} style={{ marginBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                      <span>{item.role}</span>
                      <span>{item.startDate && `${item.startDate} - `}{item.endDate && item.endDate}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontStyle: 'italic', marginBottom: '4px' }}>
                      <span>{item.company}</span>
                      <span>{item.location}</span>
                    </div>
                    
                    {item.bullets && item.bullets.length > 0 && (
                      <ul style={{ margin: 0, paddingLeft: '24px', listStyleType: 'disc' }}>
                        {item.bullets.map((b, i) => <li key={i} style={{ marginBottom: '2px' }}>{b}</li>)}
                      </ul>
                    )}
                  </div>
                ))}

                {sec.type === 'education' && sec.data?.items?.map(item => (
                  <div key={item.id} style={{ marginBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                      <span>{item.degree}</span>
                      <span>{item.startDate && `${item.startDate} - `}{item.endDate && item.endDate}</span>
                    </div>
                    <div style={{ fontStyle: 'italic', marginBottom: '2px' }}>{item.institution}</div>
                    {(item.gpa || item.honors) && (
                      <div>
                        {item.gpa && <span>GPA: {item.gpa} </span>}
                        {item.honors && <span>| {item.honors}</span>}
                      </div>
                    )}
                  </div>
                ))}

                {sec.type === 'skills' && (
                  <div>
                    {sec.data?.categories?.map(cat => (
                      <div key={cat.id} style={{ marginBottom: '4px' }}>
                        <span style={{ fontWeight: 'bold' }}>{cat.label}: </span>
                        <span>{cat.skills?.join(', ')}</span>
                      </div>
                    ))}
                  </div>
                )}

                {sec.type === 'projects' && sec.data?.items?.map(item => (
                  <div key={item.id} style={{ marginBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                      <span>{item.name}</span>
                      <span style={{ fontStyle: 'normal' }}>{item.techStack}</span>
                    </div>
                    {item.description && <div style={{ fontStyle: 'italic', marginBottom: '4px' }}>{item.description}</div>}
                    {item.bullets && item.bullets.length > 0 && (
                      <ul style={{ margin: 0, paddingLeft: '24px', listStyleType: 'disc' }}>
                        {item.bullets.map((b, i) => <li key={i} style={{ marginBottom: '2px' }}>{b}</li>)}
                      </ul>
                    )}
                  </div>
                ))}

                {sec.type === 'certifications' && (
                  <div>
                    {sec.data?.items?.map(item => (
                      <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontWeight: 'bold' }}>{item.name}</span>
                        <span>{item.issuer} {item.date && `(${item.date})`}</span>
                      </div>
                    ))}
                  </div>
                )}

                {sec.type === 'languages' && (
                  <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                    {sec.data?.items?.map(item => (
                      <div key={item.id}>
                        <span style={{ fontWeight: 'bold' }}>{item.language}: </span>
                        <span>{item.proficiency}</span>
                      </div>
                    ))}
                  </div>
                )}

                {sec.type === 'custom' && sec.data?.items?.map(item => (
                  <div key={item.id} style={{ marginBottom: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                      <span>{item.title}</span>
                      <span>{item.subtitle}</span>
                    </div>
                    <div style={{ marginTop: '2px' }}>{item.body}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
