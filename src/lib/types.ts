import { ItemDefinition, RowDefinition } from 'dnd-timeline';

export interface GanttItem extends ItemDefinition {}

export interface GanttRow<Item extends GanttItem = GanttItem>
  extends RowDefinition {}
