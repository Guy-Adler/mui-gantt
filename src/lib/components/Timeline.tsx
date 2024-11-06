import React, { useMemo } from 'react';
import {
  groupItemsToRows,
  ItemDefinition,
  RowDefinition,
  useTimelineContext,
} from 'dnd-timeline';
import { Box, styled, SxProps } from '@mui/material';
import { Row, Sidebar, Item } from '.';
import { TimeAxis, DEFAULT_MARKERS } from './TimeAxis';
import { GanttMarker } from '../types';
import { GanttToolbar, GanttToolbarProps } from './Toolbar';
export interface TimelineProps extends GanttToolbarProps {
  rows: RowDefinition[];
  items: ItemDefinition[];
  sx?: SxProps;
  markers?: GanttMarker[];
}

const PREFIX = 'Timeline';
export const TimelineClasses = {
  root: `${PREFIX}-Root`,
  rowsContainer: `${PREFIX}-RowsContainer`,
};

const TimelineContainer = styled(Box, {
  name: 'Timeline',
  overridesResolver: (_, styles) => styles.root,
})({
  [`&.${TimelineClasses.root}`]: {
    height: '100%',
    width: '100%',
  },
  [`& .${TimelineClasses.rowsContainer}`]: {
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
  },
});

export const Timeline: React.FC<TimelineProps> = ({
  rows,
  items,
  sx,
  markers,
  title,
}) => {
  const { setTimelineRef, style, range } = useTimelineContext();

  const groupedRows = useMemo(
    () => groupItemsToRows(items, range),
    [items, range]
  );

  return (
    <TimelineContainer
      className={TimelineClasses.root}
      ref={setTimelineRef}
      style={style}
      sx={sx}
    >
      <GanttToolbar title={title} />
      <TimeAxis markers={markers ?? DEFAULT_MARKERS} />
      <Box className={TimelineClasses.rowsContainer}>
        {rows.map((row) => (
          <Row row={row} key={row.id} sidebar={Sidebar}>
            {groupedRows[row.id]?.map((item) => (
              <Item item={item} key={item.id}>
                {`Item ${item.id}`}
              </Item>
            ))}
          </Row>
        ))}
      </Box>
    </TimelineContainer>
  );
};
