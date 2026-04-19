import React, { useMemo } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, X, Plus } from 'lucide-react';
import InlineEdit from './InlineEdit';
import BulletEnhancer from './BulletEnhancer';

function SortableBullet({ id, index, text, onChange, onRemove, onEnhanced }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition };
  
  return (
    <div ref={setNodeRef} style={style} className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 relative group mb-2 pl-2">
      <div {...attributes} {...listeners} className="cursor-grab text-[#2E2E3D] hover:text-[#6C63FF] focus:outline-none hidden sm:block mr-2 mt-1 self-start">
        <GripVertical size={16} />
      </div>
      <div className="w-[6px] h-[6px] bg-[#6C63FF] rounded-full mr-3 mt-2 self-start flex-shrink-0 hidden sm:block" />
      
      <div className="flex-1">
        <InlineEdit 
          value={text} 
          onChange={(val) => onChange(index, val)} 
          placeholder="Describe your achievement or responsibility..." 
          className="text-[#F1F0FF] text-sm leading-relaxed block w-full"
          multiline={true}
        />
      </div>
      
      <div className="flex items-center space-x-1 sm:ml-2 mt-1 sm:mt-0 justify-end opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity self-start">
        <BulletEnhancer bullet={text} onEnhanced={(val) => onEnhanced(index, val)} />
        <button onClick={() => onRemove(index)} className="p-1 text-[#8B8A9F] hover:text-red-400 rounded transition-colors" title="Remove bullet">
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

export default function SortableBullets({ bullets = [], onUpdate, sectionId, itemId, dispatch }) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const bulletItems = useMemo(() => bullets.map((b, i) => ({ id: `${itemId}-bullet-${i}`, text: b, index: i })), [bullets, itemId]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id && over) {
      const oldIndex = bulletItems.findIndex(b => b.id === active.id);
      const newIndex = bulletItems.findIndex(b => b.id === over.id);
      const newOrder = arrayMove(bullets, oldIndex, newIndex);
      onUpdate(newOrder); // Instead of raw dispatch, callback sets entirely
    }
  };

  const handleBulletChange = (idx, text) => {
    dispatch({ type: 'UPDATE_BULLET', payload: { sectionId, itemId, bulletIndex: idx, bullet: text } });
  };

  const handleBulletEnhanced = (idx, text) => {
    dispatch({ type: 'UPDATE_BULLET', payload: { sectionId, itemId, bulletIndex: idx, bullet: text } });
  };
  
  const handleRemoveBullet = (idx) => {
    dispatch({ type: 'REMOVE_BULLET', payload: { sectionId, itemId, bulletIndex: idx } });
  };

  const handleAddBullet = () => {
    dispatch({ type: 'ADD_BULLET', payload: { sectionId, itemId, bullet: '' } });
  };

  return (
    <div className="mt-3">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={bulletItems.map(b => b.id)} strategy={verticalListSortingStrategy}>
          <div>
            {bulletItems.map((b) => (
              <SortableBullet 
                key={b.id} id={b.id} index={b.index} text={b.text} 
                onChange={handleBulletChange} onRemove={handleRemoveBullet} onEnhanced={handleBulletEnhanced}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <button onClick={handleAddBullet} className="mt-2 flex items-center space-x-1 text-sm text-[#6C63FF] hover:text-[#5A52E0] transition-colors pl-8">
        <Plus size={16} />
        <span>Add Bullet</span>
      </button>
    </div>
  );
}
