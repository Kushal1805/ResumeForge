import React, { useRef, useEffect, useState } from 'react';

export default function InlineEdit({ value, onChange, placeholder = '', className = '', multiline = false }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(value);
  const elementRef = useRef(null);

  useEffect(() => {
    setText(value);
  }, [value]);

  const handleBlur = (e) => {
    setIsEditing(false);
    const newText = e.target.innerText || e.target.textContent;
    if (newText.trim() !== value) {
      onChange(newText.trim());
    }
    setText(newText.trim());
  };

  const handleKeyDown = (e) => {
    if (!multiline && e.key === 'Enter') {
      e.preventDefault();
      elementRef.current?.blur();
    }
  };

  const Component = multiline ? 'div' : 'span';

  return (
    <Component
      ref={elementRef}
      contentEditable={true}
      suppressContentEditableWarning={true}
      onFocus={() => setIsEditing(true)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className={`outline-none transition-colors duration-200 border-b border-transparent hover:border-dashed hover:border-[#6C63FF]/50 focus:border-solid focus:border-[#6C63FF] 
        ${!text ? 'text-[#8B8A9F] italic before:content-[attr(data-placeholder)]' : ''} ${className}`}
      data-placeholder={placeholder}
    >
      {text}
    </Component>
  );
}
