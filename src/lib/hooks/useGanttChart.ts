import { Range } from 'dnd-timeline';
import { useCallback, useState } from 'react';

export interface UseGanttChartParams {
  defaultRange: Range;
}

const useGanttChart = ({ defaultRange }: UseGanttChartParams) => {
  const [range, setRange] = useState(defaultRange);
  const onResizeEnd = useCallback(() => {}, []);

  return {
    range,
    setRange,
    onResizeEnd,
  };
};

export default useGanttChart;
