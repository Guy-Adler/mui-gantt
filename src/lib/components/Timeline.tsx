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
import { hoursToMilliseconds } from 'date-fns';
export interface TimelineProps {
  rows: RowDefinition[];
  items: ItemDefinition[];
  sx?: SxProps;
}

const TimelineContainer = styled(Box, {
  name: 'Timeline',
  overridesResolver: (_, styles) => styles.root,
})({
  height: '100%',
  width: '100%',
});

export const Timeline: React.FC<TimelineProps> = ({ rows, items, sx }) => {
  const { setTimelineRef, style, range } = useTimelineContext();

  const groupedRows = useMemo(
    () => groupItemsToRows(items, range),
    [items, range]
  );

  return (
    <TimelineContainer ref={setTimelineRef} style={style} sx={sx}>
      <TimeAxis
        markers={[
          {
            delta: hoursToMilliseconds(24),
            shouldPlaceMarker: () => true,
            minRangeSize: hoursToMilliseconds(24),
            maxRangeSize: hoursToMilliseconds(24) * 30,
            getLabel: (time) => (
              <div>
                {new Date(time).getDate() === 1 &&
                  new Date(time).getMonth() === 0 && (
                    <>
                      <i>
                        <em>
                          {new Date(time).toLocaleDateString(
                            new Intl.Locale('en-GB'),
                            {
                              year: 'numeric',
                            }
                          )}
                        </em>
                      </i>
                      <br />
                    </>
                  )}
                {new Date(time).getDate() === 1 && (
                  <>
                    <i>
                      {new Date(time).toLocaleDateString(
                        new Intl.Locale('en-GB'),
                        {
                          month: 'long',
                        }
                      )}
                    </i>
                    <br />
                  </>
                )}
                {new Date(time).getDate()}
              </div>
            ),
          },
        ]}
        markers={DEFAULT_MARKERS}
      />
      {rows.map((row) => (
        <Row row={row} key={row.id} sidebar={Sidebar}>
          {groupedRows[row.id]?.map((item) => (
            <Item item={item} key={item.id}>
              {`Item ${item.id}`}
            </Item>
          ))}
        </Row>
      ))}
    </TimelineContainer>
  );
};
