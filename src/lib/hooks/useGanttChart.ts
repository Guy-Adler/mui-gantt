import { Range, TimelineContextProps } from 'dnd-timeline';
import { useCallback, useState } from 'react';

export interface UseGanttChartParams {
  defaultRange: Range;
  /** Minimum range length (end-start) in ms */
  minZoom?: number;
  /** Maximum range length (end-start) in ms */
  maxZoom?: number;
  /** Minimum time (start) in ms */
  minTime?: number;
  /** Maximum time (start) in ms */
  maxTime?: number;
}

export const useGanttChart = ({
  defaultRange,
  minZoom = -Infinity,
  maxZoom = Infinity,
  minTime = -Infinity,
  maxTime = Infinity,
}: UseGanttChartParams): TimelineContextProps => {
  const [range, setRange] = useState(defaultRange);
  const onResizeEnd = useCallback(() => {}, []);

  // (updateFunction: (prev: Range) => Range) => void
  const onRangeChanged = useCallback(
    (updateFunction: (prev: Range) => Range) => {
      setRange((prev) => {
        const range = updateFunction(prev);
        const zoom = range.end - range.start;

        if (
          zoom >= minZoom &&
          zoom <= maxZoom &&
          range.start >= minTime &&
          range.end <= maxTime
        ) {
          return range;
        } else {
          return prev;
        }
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
