import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { endOfMonth, startOfMonth } from 'date-fns';
import GanttChart from './lib/components/GanttChart';
import { generateItems, generateRows } from './utils';

const DEFAULT_RANGE = {
  start: startOfMonth(new Date()).getTime(),
  end: endOfMonth(new Date()).getTime(),
};

const App = () => {
  const [rows] = useState(generateRows(5));
  const [items] = useState(generateItems(10, DEFAULT_RANGE, rows));

  return <GanttChart defaultRange={DEFAULT_RANGE} rows={rows} items={items} />;
};

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
