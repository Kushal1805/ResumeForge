import html2pdf from 'html2pdf.js';

export const exportResumePDF = (name) => {
  return new Promise((resolve, reject) => {
    const element = document.getElementById('resume-preview');
    if (!element) return reject('Preview element not found');

    // Store previous transform and temporarily remove it for correct scaling
    const prevTransform = element.style.transform;
    element.style.transform = 'none';

    // Wait a brief moment for layout to adapt
    setTimeout(() => {
      const opt = {
        margin:       0,
        filename:     `${name || 'Resume'}_Resume.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, letterRendering: true, backgroundColor: '#FFFFFF' },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      html2pdf().set(opt).from(element).save().then(() => {
        element.style.transform = prevTransform;
        resolve();
      }).catch((e) => {
        element.style.transform = prevTransform;
        reject(e);
      });
    }, 100);
  });
};
