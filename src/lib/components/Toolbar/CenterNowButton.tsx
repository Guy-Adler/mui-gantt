import React, { useCallback } from 'react';
import { Today } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { useTimelineContext } from 'dnd-timeline';
import { useGanttChartContext } from '../../contexts';

export const CenterNowButton = () => {
  const { range } = useTimelineContext();
  const ganttChartContext = useGanttChartContext();

  const handleClick = useCallback(() => {
    if (ganttChartContext === null) return;
    const { changeRange, zoom } = ganttChartContext;

    const now = Date.now();

    changeRange(() => ({
      start: now - zoom / 2,
      end: now + zoom / 2,
    }));
  }, [range, ganttChartContext]);

  return (
    <Tooltip title="Jump to Current Time">
      <IconButton onClick={handleClick}>
        <Today />
      </IconButton>
    </Tooltip>
  );
};
