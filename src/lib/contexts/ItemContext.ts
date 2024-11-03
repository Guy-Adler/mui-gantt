import { createContext, useContext } from 'react';
import { GanttItem } from '../types';

export const ItemContext = createContext<GanttItem | null>(null);

export const useGanttItem = () => useContext(ItemContext);
