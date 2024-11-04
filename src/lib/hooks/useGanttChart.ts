import { Range, TimelineContextProps } from 'dnd-timeline';
import { useCallback, useState } from 'react';

export interface UseGanttChartParams {
  defaultRange: Range;
  /** Minimum range length (end-start) in ms */
  minZoom?: number;
  /** Maximum range length (end-start) in ms */
  maxZoom?: number;
}

export const useGanttChart = ({
  defaultRange,
  maxZoom = Infinity,
  minZoom = -Infinity,
}: UseGanttChartParams): TimelineContextProps => {
  const [range, setRange] = useState(defaultRange);
  const onResizeEnd = useCallback(() => {}, []);

  // (updateFunction: (prev: Range) => Range) => void
  const onRangeChanged = useCallback(
    (updateFunction: (prev: Range) => Range) => {
      setRange((prev) => {
        const range = updateFunction(prev);
        const zoom = range.end - range.start;
        return zoom > minZoom && zoom < maxZoom ? range : prev;
      });
    },
    [setRange, maxZoom, minZoom]
  );

  return {
    range,
    onRangeChanged,
    onResizeEnd,
  };
};
