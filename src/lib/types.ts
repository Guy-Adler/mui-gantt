import { ItemDefinition, RowDefinition } from 'dnd-timeline';
import React from 'react';

export interface GanttItem extends ItemDefinition {}

export interface GanttRow<Item extends GanttItem = GanttItem>
  extends RowDefinition {}

export interface GanttMarker {
  /** Amount of time (in ms) between each possible marker  */
  delta: number;
  /** Returns true if a maker should be placed at that time */
  shouldPlaceMarker: (time: number) => boolean;
  /** Maximum timeframe range in which to show the markers */
  maxRangeSize?: number;
  /** Minimum timeframe range in which to show the markers */
  minRangeSize?: number;
  getLabel?: (time: number) => React.ReactNode;
}
