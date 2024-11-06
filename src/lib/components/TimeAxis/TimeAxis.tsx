import React, { useMemo } from 'react';
import { useTimelineContext } from 'dnd-timeline';
import { Box, Divider, Paper, styled } from '@mui/material';
import { GanttMarker } from '../../types';
import { CurrentTimeMarker } from './CurrentTimeMarker';

export interface TimeAxisProps {
  markers: GanttMarker[];
}

interface CalculatedMarker {
  label?: React.ReactNode;
  sideDelta: number;
  heightMultiplier: number;
}

const range = (start: number, stop: number, step: number) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

const PREFIX = 'TimeAxis';

export const TimeAxisClasses = {
  root: `${PREFIX}-Root`,
  axis: `${PREFIX}-Axis`,
  label: `${PREFIX}-Label`,
  marker: `${PREFIX}-Marker`,
  currentTimeMarker: `${PREFIX}-CurrentTime`,
};

const TimeAxisRoot = styled(Box, {
  name: PREFIX,
  overridesResolver: (_, styles) => styles.root,
})(({ theme }) =>
  theme.unstable_sx({
    [`&.${TimeAxisClasses.root}`]: {},
    [`& .${TimeAxisClasses.axis}`]: {
      display: 'flex',
      position: 'relative',
      overflow: 'hidden',
      height: theme.spacing(6),
    },
    [`& .${TimeAxisClasses.marker}`]: {
      zIndex: 3,
      position: 'absolute',
    },
    [`& .${TimeAxisClasses.label}`]: {
      position: 'absolute',
      bottom: 0,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
    },
    [`& .${TimeAxisClasses.currentTimeMarker}`]: {
      backgroundColor: 'red',
    },
  })
);

const MarkerLabel = ({ marker }: { marker: CalculatedMarker }) => {
  const { direction } = useTimelineContext();
  const side = direction === 'rtl' ? 'right' : 'left';

  return (
    <Box
      className={TimeAxisClasses.label}
      style={{
        [side]: `${marker.sideDelta}px`,
      }}
    >
      {marker?.label}
    </Box>
  );
};

export const TimeAxis = ({ markers }: TimeAxisProps) => {
  const {
    direction,
    range: timeframe,
    sidebarWidth,
    valueToPixels,
  } = useTimelineContext();

  const side = direction === 'rtl' ? 'right' : 'left';

  const visibleMarkers = useMemo(() => {
    const sortedMarkers = [...markers].sort((a, b) => b.delta - a.delta);
    if (sortedMarkers.length === 0) {
      return [];
    }

    const delta = sortedMarkers.at(-1)!.delta;
    const rangeSize = timeframe.end - timeframe.start;

    const startTime = Math.floor(timeframe.start / delta) * delta;
    const endTime = timeframe.end;

    const markerSideDeltas = range(startTime, endTime, delta).reduce(
      (allMarkers, time) => {
        const multiplierIndex = sortedMarkers.findIndex(
          (marker) =>
            time % marker.delta === 0 &&
            (!marker.maxRangeSize || rangeSize <= marker.maxRangeSize) &&
            (!marker.minRangeSize || rangeSize >= marker.minRangeSize)
        );

        if (multiplierIndex === -1) return allMarkers;

        const multiplier = sortedMarkers[multiplierIndex];
        if (!multiplier.shouldPlaceMarker(time)) return allMarkers;
        const label = multiplier.getLabel?.(time);
        allMarkers.push({
          label,
          heightMultiplier: 1 / (multiplierIndex + 1),
          sideDelta: valueToPixels(time - timeframe.start),
        });

        return allMarkers;
      },
      [] as CalculatedMarker[]
    );

    return markerSideDeltas;
  }, [timeframe, markers, valueToPixels]);

  return (
    <TimeAxisRoot className={TimeAxisClasses.root}>
      <CurrentTimeMarker />
      <Paper square elevation={0}>
        <Box
          className={TimeAxisClasses.axis}
          sx={{
            [`m${side.charAt(0)}`]: `${sidebarWidth}px`,
          }}
        >
          {visibleMarkers.map((marker, index) => (
            <MarkerLabel key={`${marker.sideDelta}-${index}`} marker={marker} />
          ))}
        </Box>
      </Paper>
      <Box>
        {visibleMarkers.map((marker, index) => (
          <Divider
            orientation="vertical"
            className={TimeAxisClasses.marker}
            key={`${marker.sideDelta}-${index}`}
            sx={{
              [`m${side.charAt(0)}`]: `${sidebarWidth}px`,
              [side]: `${marker.sideDelta}px`,
            }}
          />
        ))}
      </Box>
    </TimeAxisRoot>
  );
};
