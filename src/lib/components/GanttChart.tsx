import React from 'react';
import { TimelineContext } from 'dnd-timeline';
import { Timeline, TimelineProps } from '.';
import { useGanttChart, UseGanttChartParams } from '../hooks';
import { SxProps } from '@mui/material';

export type GanttChartProps = Pick<TimelineProps, 'rows' | 'items'> &
  UseGanttChartParams & {
    sx?: SxProps;
  };

export const GanttChart: React.FC<GanttChartProps> = ({
  defaultRange,
  minZoom,
  maxZoom,
  rows,
  items,
  sx = {},
}) => {
  const { range, onRangeChanged, onResizeEnd } = useGanttChart({
    defaultRange,
    minZoom,
    maxZoom,
  });

  return (
    <TimelineContext
      range={range}
      onRangeChanged={onRangeChanged}
      onResizeEnd={onResizeEnd}
    >
      <Timeline rows={rows} items={items} sx={sx} />
    </TimelineContext>
  );
};
