import React, { useLayoutEffect, useRef } from 'react';
import { useTimelineContext } from 'dnd-timeline';
import { Divider } from '@mui/material';
import { TimeAxisClasses } from './TimeAxis';

const CurrentTimeMarker = React.memo(function CurrentTimeMarker() {
  const timeCursorRef = useRef<HTMLHRElement>(null);

  const { range, direction, sidebarWidth, valueToPixels } =
    useTimelineContext();

  const side = direction === 'rtl' ? 'right' : 'left';

  const isVisible =
    new Date().getTime() > range.start && new Date().getTime() < range.end;

  useLayoutEffect(() => {
    if (!isVisible) return;

    const offsetCursor = () => {
      if (!timeCursorRef.current) return;
      const timeDelta = new Date().getTime() - range.start;
      const timeDeltaInPixels = valueToPixels(timeDelta);

      const sideDelta = sidebarWidth + timeDeltaInPixels;
      timeCursorRef.current.style[side] = `${sideDelta}px`;
    };

    offsetCursor();

    const intervalTime = (range.end - range.start) / window.innerWidth;
    const interval = setInterval(offsetCursor, intervalTime);

    return () => {
      clearInterval(interval);
    };
  }, [side, sidebarWidth, range.start, range.end, valueToPixels, isVisible]);

  if (!isVisible) return null;

  return (
    <Divider
      ref={timeCursorRef}
      orientation="vertical"
      className={[
        TimeAxisClasses.currentTimeMarker,
        TimeAxisClasses.marker,
      ].join(' ')}
      sx={{
        [`m${side.charAt(0)}`]: `${sidebarWidth}px`,
      }}
    />
  );
});

export { CurrentTimeMarker };
