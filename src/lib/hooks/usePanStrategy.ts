import { UsePanStrategy } from 'dnd-timeline';
import { useLayoutEffect } from 'react';

export const usePanStrategy: UsePanStrategy = (timelineRef, onPanEnd) => {
  useLayoutEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    const wheelHandler = (event: WheelEvent) => {
      // Normal scrolling - vertical scroll.
      if (!event.shiftKey && !event.ctrlKey) return;

      event.preventDefault();
      event.stopPropagation();

      onPanEnd({
        clientX: event.clientX,
        clientY: event.clientY,
        // Shift + scrolling - horizontal scroll
        deltaX: event.shiftKey ? event.deltaX || event.deltaY : 0,
        // Ctrl + scrolling - zoom
        deltaY: event.ctrlKey ? event.deltaY || event.deltaX : 0,
      });
    };

    timeline.addEventListener('wheel', wheelHandler);

    return () => timeline.removeEventListener('wheel', wheelHandler);
  }, [timelineRef, onPanEnd]);
};
