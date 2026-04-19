import React from 'react';
import { getFontFamily } from './TplSidebar';

export default function TplRightSidebar({ state }) {
  const { meta, sections } = state;
  const fonts = getFontFamily(meta.fontPair);
  const headerSection = sections.find(s => s.type === 'header')?.data || {};
  
  const sidebarTypes = ['contact', 'skills', 'languages', 'certifications'];
  const sidebarSections = sections.filter(s => sidebarTypes.includes(s.type) && s.visible);
  const mainSections = sections.filter(s => !sidebarTypes.includes(s.type) && s.type !== 'header' && s.visible);

  const initials = headerSection.name 
    ? headerSection.name.split(' ').map(n => n[0]).join('').substring(0, 2).toLowerCase() 
    : 'sp';

  return (
    <div style={{ width: '794px', minHeight: '1123px', display: 'flex', fontFamily: fonts.body, fontSize: '13px', lineHeight: '1.5', color: '#111827', backgroundColor: '#FFFFFF', boxSizing: 'border-box' }}>
      
      {/* Main Timeline Column */}
      <div style={{ width: '68%', padding: '40px 24px 40px 40px', position: 'relative' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '48px' }}>
            {/* Initials Circle */}
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: meta.accentColor, display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontSize: '42px', fontStyle: 'italic', fontFamily: fonts.heading, fontWeight: 'bold' }}>
              {initials}
            </div>
            <div>
              <h1 style={{ fontFamily: fonts.heading, fontSize: '36px', fontWeight: 'bold', color: meta.accentColor, margin: '0 0 4px 0' }}>{headerSection.name || 'Unnamed'}</h1>
              {headerSection.title && <div style={{ fontSize: '14px', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '1px' }}>{headerSection.title}</div>}
            </div>
         </div>

         {/* Vertical Timeline Line */}
         <div style={{ position: 'absolute', left: '160px', top: '180px', bottom: '40px', width: '2px', backgroundColor: '#F3F4F6', zIndex: 1 }} />

         {mainSections.map(sec => (
           <div key={sec.id} style={{ position: 'relative', marginBottom: '32px', pageBreakInside: 'avoid' }}>
             
             {/* Section Header with Icon */}
             <div style={{ display: 'flex', alignItems: 'center', marginLeft: '90px', marginBottom: '16px' }}>
               <div style={{ zIndex: 2, width: '32px', height: '32px', borderRadius: '50%', backgroundColor: meta.accentColor, border: '4px solid #FFFFFF', color: '#FFFFFF', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '14px', marginLeft: '-11px', marginRight: '16px' }}>✦</div>
               <h2 style={{ fontFamily: fonts.heading, fontSize: '18px', fontWeight: 'bold', color: meta.accentColor, textTransform: 'capitalize' }}>
                 {sec.type === 'custom' ? (sec.data?.sectionTitle || 'Custom') : sec.type}
               </h2>
             </div>

             <div style={{ marginLeft: '130px', fontSize: '13px' }}>
               {sec.type === 'summary' && <p style={{ margin: 0, color: '#374151' }}>{sec.data?.text}</p>}

               {(sec.type === 'experience' || sec.type === 'education' || sec.type === 'projects') && sec.data?.items?.map(item => (
                 <div key={item.id} style={{ marginBottom: '20px', position: 'relative' }}>
                   {/* Date indicator moving into left margin */}
                   <div style={{ position: 'absolute', left: '-125px', top: '2px', width: '90px', textAlign: 'right', fontSize: '11px', fontWeight: 'bold', color: '#374151' }}>
                     {item.startDate && `${item.startDate}`}<br/>{item.endDate && item.endDate}
                   </div>
                   <div style={{ position: 'absolute', left: '-22px', top: '6px', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: meta.accentColor, border: '2px solid #FFFFFF', zIndex: 2 }} />
                   
                   <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#111827', marginBottom: '2px' }}>{item.role || item.degree || item.name}</div>
                   <div style={{ color: '#4B5563', marginBottom: '6px' }}>{item.company || item.institution || item.techStack}</div>
                   {item.description && <div style={{ fontSize: '12px', fontStyle: 'italic', color: '#6B7280', marginBottom: '6px' }}>{item.description}</div>}
                   {item.bullets && item.bullets.length > 0 && (
                     <ul style={{ margin: 0, paddingLeft: '16px', listStyleType: 'disc', color: '#4B5563' }}>
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

      {/* Right Sidebar */}
      <div style={{ width: '32%', backgroundColor: '#F9FAFB', padding: '40px 32px', borderLeft: '1px solid #E5E7EB' }}>
         
         <div style={{ marginBottom: '32px', marginTop: '130px' }}>
           <h2 style={{ fontFamily: fonts.heading, fontSize: '16px', fontWeight: 'bold', color: meta.accentColor, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
             <span style={{ display: 'inline-flex', width: '28px', height: '28px', borderRadius: '50%', backgroundColor: meta.accentColor, color: 'white', justifyContent: 'center', alignItems: 'center' }}>👤</span> Contact
           </h2>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px', color: '#4B5563' }}>
             {headerSection.location && <div><strong style={{color:'#111827'}}>Location</strong><br/>{headerSection.location}</div>}
             {headerSection.phone && <div><strong style={{color:'#111827'}}>Phone</strong><br/>{headerSection.phone}</div>}
             {headerSection.email && <div><strong style={{color:'#111827'}}>Email</strong><br/>{headerSection.email}</div>}
             {headerSection.linkedin && <div style={{wordBreak: 'break-all'}}><strong style={{color:'#111827'}}>LinkedIn</strong><br/>{headerSection.linkedin}</div>}
             {headerSection.website && <div style={{wordBreak: 'break-all'}}><strong style={{color:'#111827'}}>Website</strong><br/>{headerSection.website}</div>}
           </div>
         </div>

         {sidebarSections.map(sec => (
           <div key={sec.id} style={{ marginBottom: '32px' }}>
             <h2 style={{ fontFamily: fonts.heading, fontSize: '16px', fontWeight: 'bold', color: meta.accentColor, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', textTransform: 'capitalize' }}>
               <span style={{ display: 'inline-flex', width: '28px', height: '28px', borderRadius: '50%', backgroundColor: meta.accentColor, color: 'white', justifyContent: 'center', alignItems: 'center' }}>❖</span> {sec.type}
             </h2>
             {sec.type === 'skills' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {sec.data?.categories?.map(cat => (
                    <div key={cat.id}>
                      <div style={{ fontWeight: 'bold', fontSize: '13px', color: '#111827', marginBottom: '2px' }}>{cat.label}</div>
                      <div style={{ color: '#4B5563', fontSize: '12px' }}>
                         <ul style={{ margin: 0, paddingLeft: '16px', listStyleType: 'square' }}>
                           {cat.skills?.map(s => <li key={s}>{s}</li>)}
                         </ul>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {sec.type === 'languages' && sec.data?.items?.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 'bold', color: '#111827' }}>{item.language}</span><span style={{ color: '#6B7280' }}>{item.proficiency}</span>
                </div>
              ))}
              {sec.type === 'certifications' && sec.data?.items?.map(item => (
                <div key={item.id} style={{ marginBottom: '12px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '12px', color: '#111827' }}>{item.name}</div>
                  <div style={{ color: '#6B7280', fontSize: '11px' }}>{item.issuer} {item.date && `• ${item.date}`}</div>
                </div>
              ))}
           </div>
         ))}
      </div>
    </div>
  );
}
