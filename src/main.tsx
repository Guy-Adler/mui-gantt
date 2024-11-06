import React from 'react';
import { createRoot } from 'react-dom/client';
import { endOfMonth, startOfMonth } from 'date-fns';
import './index.css';
import { GanttChart } from './lib';
import { millisecondsInDay } from 'date-fns/constants';
import { generateRows } from './utils';

const DEFAULT_RANGE = {
  start: startOfMonth(new Date()).getTime(),
  end: endOfMonth(new Date()).getTime(),
};
const ONE_DAY = millisecondsInDay;
const THREE_MONTHS = millisecondsInDay * 30 * 3;

const App = () => {
  const rows = generateRows(50);

  return (
    <GanttChart
      defaultRange={DEFAULT_RANGE}
      minZoom={ONE_DAY}
      maxZoom={THREE_MONTHS}
      rows={rows}
      items={[]}
    />
  );
};

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
