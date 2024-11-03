import React from 'react';
import { Range, TimelineContext } from 'dnd-timeline';
import { Timeline, TimelineProps } from '.';
import { useGanttChart } from '../hooks';
import { SxProps } from '@mui/material';

export type GanttChartProps = Pick<TimelineProps, 'rows' | 'items'> & {
  defaultRange: Range;
  sx?: SxProps;
};

export const GanttChart: React.FC<GanttChartProps> = ({
  defaultRange,
  rows,
  items,
  sx = {},
}) => {
  const { range, setRange, onResizeEnd } = useGanttChart({
    defaultRange,
  });

  return (
    <TimelineContext
      range={range}
      onRangeChanged={setRange}
      onResizeEnd={onResizeEnd}
    >
      <Timeline rows={rows} items={items} sx={sx} />
    </TimelineContext>
  );
};
