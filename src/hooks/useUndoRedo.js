import { useState, useCallback } from 'react';

// A generic hook for undo/redo state logic
export function useUndoRedo(initialState) {
  const [history, setHistory] = useState([initialState]);
  const [index, setIndex] = useState(0);

  const setState = useCallback((newState) => {
    setHistory((prev) => {
      const nextHistory = prev.slice(0, index + 1);
      nextHistory.push(newState);
      // Keep max 50 entries
      if (nextHistory.length > 50) {
        nextHistory.shift();
        return nextHistory;
      }
      return nextHistory;
    });
    setIndex((prevIndex) => Math.min(prevIndex + 1, 49)); // Since max length is 50, index max is 49
  }, [index]);

  const undo = useCallback(() => {
    setIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const redo = useCallback(() => {
    setHistory((prev) => {
      setIndex((i) => Math.min(i + 1, prev.length - 1));
      return prev;
    });
  }, []);

  return [history[index], setState, { undo, redo, canUndo: index > 0, canRedo: index < history.length - 1 }];
}
