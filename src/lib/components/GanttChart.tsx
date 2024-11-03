import React from 'react';
import { Range, TimelineContext } from 'dnd-timeline';
import Timeline, { TimelineProps } from './Timeline';
import useGanttChart from '../hooks/useGanttChart';

export type GanttChartProps = Pick<TimelineProps, 'rows' | 'items'> & {
  defaultRange: Range;
};

const GanttChart: React.FC<GanttChartProps> = ({
  defaultRange,
  rows,
  items,
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
      <Timeline rows={rows} items={items} />
    </TimelineContext>
  );
};

export default GanttChart;
