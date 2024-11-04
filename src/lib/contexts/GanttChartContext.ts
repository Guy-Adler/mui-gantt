import { TimelineContextProps } from 'dnd-timeline';
import { createContext, useContext } from 'react';

interface GanttChartContextValue {
  changeRange: TimelineContextProps['onRangeChanged'];
  zoom: number;
}

export const GanttChartContext = createContext<GanttChartContextValue | null>(
  null
);

export const useGanttChartContext = () => useContext(GanttChartContext);
