import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { endOfMonth, startOfMonth } from 'date-fns';
import './index.css';
import { GanttChart } from './lib';
import { generateItems, generateRows } from './utils';
import { millisecondsInDay } from 'date-fns/constants';

const DEFAULT_RANGE = {
  start: startOfMonth(new Date()).getTime(),
  end: endOfMonth(new Date()).getTime(),
};
const ONE_DAY = millisecondsInDay;
const THREE_MONTHS = millisecondsInDay * 30 * 3;

const App = () => {
  const [rows] = useState(generateRows(5));
  const [items] = useState(generateItems(10, DEFAULT_RANGE, rows));

  return (
    <GanttChart
      defaultRange={DEFAULT_RANGE}
      minZoom={ONE_DAY}
      maxZoom={THREE_MONTHS}
      rows={rows}
      items={items}
    />
  );
};

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
