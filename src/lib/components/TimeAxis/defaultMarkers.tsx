import React from 'react';
import {
  getDate,
  hoursToMilliseconds,
  format,
  isFirstDayOfMonth,
} from 'date-fns';
import { Typography } from '@mui/material';
import { GanttMarker } from '../../types';
import { MarkerLabelClasses, MarkerLabelWrapper } from './MarkerLabel';

const DefaultLabel = React.memo(function DefaultLabel({
  time,
}: {
  time: number;
}) {
  return (
    <MarkerLabelWrapper className={MarkerLabelClasses.root}>
      {isFirstDayOfMonth(time) && (
        <Typography className={MarkerLabelClasses.month} variant="overline">
          {format(time, 'MMMM yyyy')}
        </Typography>
      )}
      <Typography className={MarkerLabelClasses.day} variant="overline">
        {format(time, 'dd')}
      </Typography>
    </MarkerLabelWrapper>
  );
});

export const DEFAULT_MARKERS: GanttMarker[] = [
  {
    // 1 day
    delta: hoursToMilliseconds(24),
    shouldPlaceMarker: () => true,
    minRangeSize: hoursToMilliseconds(24),
    maxRangeSize: hoursToMilliseconds(24) * 30,
    getLabel: (time) => <DefaultLabel time={time} />,
  },
  {
    // 2 day
    delta: hoursToMilliseconds(24),
    shouldPlaceMarker: (time) => getDate(time) % 2 === 1,
    minRangeSize: hoursToMilliseconds(24) * 30,
    maxRangeSize: hoursToMilliseconds(24) * 60,
    getLabel: (time) => <DefaultLabel time={time} />,
  },
  {
    // 1 week
    delta: hoursToMilliseconds(24),
    shouldPlaceMarker: (time) => getDate(time) % 7 === 1,
    minRangeSize: hoursToMilliseconds(24) * 60,
    getLabel: (time) => <DefaultLabel time={time} />,
  },
];
