import React from 'react';
import { useGanttRow } from '../contexts';

export const Sidebar = () => {
  const row = useGanttRow();

  if (!row) return null;

  return <div>{`Row ${row.id}`}</div>;
};
