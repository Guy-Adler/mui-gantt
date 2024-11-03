import React, { useMemo } from 'react';
import {
  groupItemsToRows,
  ItemDefinition,
  RowDefinition,
  useTimelineContext,
} from 'dnd-timeline';
import Row from './Row';
import Sidebar from './Sidebar';
import Item from './Item';

export interface TimelineProps {
  rows: RowDefinition[];
  items: ItemDefinition[];
}

const Timeline: React.FC<TimelineProps> = ({ rows, items }) => {
  const { setTimelineRef, style, range } = useTimelineContext();

  const groupedRows = useMemo(
    () => groupItemsToRows(items, range),
    [items, range]
  );

  return (
    <div ref={setTimelineRef} style={style}>
      {rows.map((row) => (
        <Row id={row.id} key={row.id} sidebar={<Sidebar row={row} />}>
          {groupedRows[row.id]?.map((item) => (
            <Item id={item.id} key={item.id} span={item.span}>
              {`Item ${item.id}`}
            </Item>
          ))}
        </Row>
      ))}
    </div>
  );
};

export default Timeline;
