import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

export default function BulletEnhancer({ bullet, onEnhanced }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleEnhance = async () => {
    if (!bullet || !bullet.trim()) return;
    setLoading(true);
    setError(false);
    
    try {
      const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
      if (!apiKey) {
        // Fallback for demo if no key
        setTimeout(() => {
          onEnhanced(bullet + " (enhanced with metrics)");
          setLoading(false);
        }, 1000);
        return;
      }
      
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-cors-bypass': 'true' // For client-side tests, though normally Anthropic blocks CORS
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20240620',
          max_tokens: 200,
          messages: [
            {
              role: 'user',
              content: `Rewrite this resume bullet point to be more impactful. Use a strong action verb, include metrics if implied, keep it under 20 words. Return ONLY the rewritten bullet, no explanation. Bullet: ${bullet}`
            }
          ]
        })
      });
      
      if (!res.ok) throw new Error('API Error');
      const data = await res.json();
      if (data && data.content && data.content[0]) {
        onEnhanced(data.content[0].text.trim());
      }
    } catch (err) {
      setError(true);
      setTimeout(() => setError(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader2 size={16} className="animate-spin text-[#6C63FF] ml-2" />;
  }

  return (
    <div className="flex items-center">
      <button 
        onClick={handleEnhance} 
        title="Enhance with AI"
        className="ml-2 p-1 text-[#6C63FF] bg-[#6C63FF]/10 hover:bg-[#6C63FF]/20 rounded transition-colors flex items-center"
      >
        <Sparkles size={14} />
      </button>
      {error && <span className="ml-2 text-xs text-red-400">Enhancement failed</span>}
    </div>
  );
}
