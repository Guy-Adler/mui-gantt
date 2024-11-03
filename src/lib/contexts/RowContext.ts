import { createContext, useContext } from 'react';
import { GanttRow } from '../types';

export const RowContext = createContext<GanttRow | null>(null);

export const useGanttRow = () => useContext(RowContext);
