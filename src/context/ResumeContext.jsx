import React, { createContext, useContext, useEffect, useReducer, useCallback, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { seedData } from '../data/seedData';
import { useUndoRedo } from '../hooks/useUndoRedo';
import { decodeState } from '../utils/shareLink';
import { saveResume as saveResumeToFirestore } from '../services/firestoreService';

export const ResumeContext = createContext(null);

const resumeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TEMPLATE':
      return { ...state, meta: { ...state.meta, template: action.payload } };
    case 'SET_ACCENT_COLOR':
      return { ...state, meta: { ...state.meta, accentColor: action.payload } };
    case 'SET_FONT_PAIR':
      return { ...state, meta: { ...state.meta, fontPair: action.payload } };
    case 'REORDER_SECTIONS':
      return { ...state, sections: action.payload };
    case 'UPDATE_SECTION_DATA':
      return {
        ...state,
        sections: state.sections.map(sec => 
          sec.id === action.payload.sectionId ? { ...sec, data: { ...sec.data, ...action.payload.data } } : sec
        )
      };
    case 'ADD_SECTION':
      return { ...state, sections: [...state.sections, action.payload] };
    case 'REMOVE_SECTION':
      return { ...state, sections: state.sections.filter(sec => sec.id !== action.payload) };
    case 'TOGGLE_SECTION_VISIBILITY':
      return {
        ...state,
        sections: state.sections.map(sec => 
          sec.id === action.payload ? { ...sec, visible: !sec.visible } : sec
        )
      };
    case 'ADD_ITEM': {
      const { sectionId, item } = action.payload;
      return {
        ...state,
        sections: state.sections.map(sec => 
          sec.id === sectionId 
            ? { ...sec, data: { ...sec.data, items: [...(sec.data.items || []), item] } } 
            : sec
        )
      };
    }
    case 'REMOVE_ITEM': {
      const { sectionId, itemId } = action.payload;
      return {
        ...state,
        sections: state.sections.map(sec => 
          sec.id === sectionId 
            ? { ...sec, data: { ...sec.data, items: sec.data.items.filter(i => i.id !== itemId) } } 
            : sec
        )
      };
    }
    case 'UPDATE_ITEM': {
      const { sectionId, itemId, data } = action.payload;
      return {
        ...state,
        sections: state.sections.map(sec => 
          sec.id === sectionId 
            ? { 
                ...sec, 
                data: { 
                  ...sec.data, 
                  items: sec.data.items.map(i => i.id === itemId ? { ...i, ...data } : i) 
                } 
              } 
            : sec
        )
      };
    }
    case 'ADD_BULLET': {
      const { sectionId, itemId, bullet } = action.payload;
      return {
        ...state,
        sections: state.sections.map(sec => 
          sec.id === sectionId 
            ? { 
                ...sec, 
                data: { 
                  ...sec.data, 
                  items: sec.data.items.map(i => 
                    i.id === itemId ? { ...i, bullets: [...(i.bullets || []), bullet] } : i
                  ) 
                } 
              } 
            : sec
        )
      };
    }
    case 'REMOVE_BULLET': {
      const { sectionId, itemId, bulletIndex } = action.payload;
      return {
        ...state,
        sections: state.sections.map(sec => 
          sec.id === sectionId 
            ? { 
                ...sec, 
                data: { 
                  ...sec.data, 
                  items: sec.data.items.map(i => 
                    i.id === itemId ? { ...i, bullets: i.bullets.filter((_, idx) => idx !== bulletIndex) } : i
                  ) 
                } 
              } 
            : sec
        )
      };
    }
    case 'UPDATE_BULLET': {
      const { sectionId, itemId, bulletIndex, bullet } = action.payload;
      return {
        ...state,
        sections: state.sections.map(sec => 
          sec.id === sectionId 
            ? { 
                ...sec, 
                data: { 
                  ...sec.data, 
                  items: sec.data.items.map(i => 
                    i.id === itemId ? { 
                      ...i, 
                      bullets: i.bullets.map((b, idx) => idx === bulletIndex ? bullet : b) 
                    } : i
                  ) 
                } 
              } 
            : sec
        )
      };
    }
    case 'LOAD_STATE':
      return action.payload;
    default:
      return state;
  }
};

export const ResumeContextProvider = ({ children }) => {
  const [currentResumeId, setCurrentResumeId] = useState(null);
  const [userId, setUserId] = useState(null);

  const [savedState, setSavedState] = useState(() => {
    try {
      if (window.location.hash) {
        const decoded = decodeState(window.location.hash);
        if (decoded) {
          window.location.hash = '';
          return decoded;
        }
      }
      const local = localStorage.getItem('resumeState');
      return local ? JSON.parse(local) : seedData;
    } catch {
      return seedData;
    }
  });

  const [state, setHistoryState, { undo, redo, canUndo, canRedo }] = useUndoRedo(savedState);
  
  const dispatch = useCallback((action) => {
    if (action.type === 'UNDO') {
      undo();
      return;
    }
    if (action.type === 'REDO') {
      redo();
      return;
    }
    
    setHistoryState((prevState) => {
      return prevState;
    });
  }, [undo, redo, setHistoryState]);

  const dispatchAction = useCallback((action) => {
    if (action.type === 'UNDO') return undo();
    if (action.type === 'REDO') return redo();
    if (action.type === 'LOAD_STATE') {
      setHistoryState(action.payload);
      return;
    }
    const nextState = resumeReducer(state, action);
    setHistoryState({ ...nextState, meta: { ...nextState.meta, lastSaved: new Date().toISOString() } });
  }, [state, undo, redo, setHistoryState]);

  // Auto-save: localStorage always, Firestore when logged in
  const saveTimeoutRef = useRef(null);
  useEffect(() => {
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      // Always save to localStorage as fallback
      localStorage.setItem('resumeState', JSON.stringify(state));

      // Save to Firestore if user is logged in and resume ID is set
      if (userId && currentResumeId) {
        const { meta, sections } = state;
        saveResumeToFirestore(userId, currentResumeId, { meta, sections })
          .catch(err => console.error('Firestore auto-save error:', err));
      }
    }, 1000);
    return () => clearTimeout(saveTimeoutRef.current);
  }, [state, userId, currentResumeId]);

  const value = {
    state,
    dispatch: dispatchAction,
    canUndo,
    canRedo,
    currentResumeId,
    setCurrentResumeId,
    userId,
    setUserId
  };

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => useContext(ResumeContext);
