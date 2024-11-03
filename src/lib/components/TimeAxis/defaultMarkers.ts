import { getDate, hoursToMilliseconds } from 'date-fns';
import { GanttMarker } from '../../types';

// Day
// 2 Days
// 1 Week

export const DEFAULT_MARKERS: GanttMarker[] = [
  {
    // 1 day
    delta: hoursToMilliseconds(24),
    shouldPlaceMarker: () => true,
    minRangeSize: hoursToMilliseconds(24),
    maxRangeSize: hoursToMilliseconds(24) * 30,
    getLabel(time) {
      return (
        
      )
    },
  },
  {
    // 2 day
    delta: hoursToMilliseconds(24),
    shouldPlaceMarker: (time) => getDate(time) % 2 === 1,
    minRangeSize: hoursToMilliseconds(24) * 30,
    maxRangeSize: hoursToMilliseconds(24) * 60,
  },
  {
    // 1 week
    delta: hoursToMilliseconds(24),
    shouldPlaceMarker: (time) => getDate(time) % 7 === 1,
    minRangeSize: hoursToMilliseconds(24) * 60,
  },
];
