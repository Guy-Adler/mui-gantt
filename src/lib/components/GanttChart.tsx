import React, { useMemo } from 'react';
import { SxProps } from '@mui/material';
import { TimelineContext } from 'dnd-timeline';
import { useGanttChart, UseGanttChartParams } from '../hooks';
import { GanttChartContext } from '../contexts';
import { Timeline, TimelineProps } from '.';
import { GanttToolbarProps } from './Toolbar';
import { usePanStrategy } from '../hooks/usePanStrategy';

export type GanttChartProps = Pick<TimelineProps, 'rows' | 'items'> &
  Partial<Pick<GanttToolbarProps, 'title'>> &
  UseGanttChartParams & {
    sx?: SxProps;
  };

export const GanttChart: React.FC<GanttChartProps> = ({
  defaultRange,
  minZoom,
  maxZoom,
  minTime,
  maxTime,
  rows,
  items,
  sx = {},
  title,
}) => {
  const { range, onRangeChanged, onResizeEnd } = useGanttChart({
    defaultRange,
    minZoom,
    maxZoom,
    minTime,
    maxTime,
  });

  const zoom = useMemo(() => range.end - range.start, [range]);

  return (
    <TimelineContext
      range={range}
      onRangeChanged={onRangeChanged}
      onResizeEnd={onResizeEnd}
      usePanStrategy={usePanStrategy}
    >
      <GanttChartContext.Provider value={{ changeRange: onRangeChanged, zoom }}>
        <Timeline rows={rows} items={items} sx={sx} title={title} />
      </GanttChartContext.Provider>
    </TimelineContext>
  );
};
