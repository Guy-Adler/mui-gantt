import React from 'react';
import { useRow } from 'dnd-timeline';
import { Box, Paper, styled } from '@mui/material';
import { RowContext } from '../contexts';
import { GanttRow } from '../types';

export interface RowProps<Row extends GanttRow> {
  children: React.ReactNode;
  sidebar: React.ElementType;
  row: Omit<Row, 'disabled'>;
}

const PREFIX = 'Row';
export const RowClasses = {
  root: `${PREFIX}-Root`,
  sidebar: `${PREFIX}-Sidebar`,
  content: `${PREFIX}-Content`,
};

const RowWrapper = styled(Box, {
  name: PREFIX,
  overridesResolver: (_, styles) => styles.root,
})({
  [`&.${RowClasses.root}`]: {
    minHeight: '100px',
    flexGrow: 1,
  },
  [`& .${RowClasses.sidebar}`]: {
    width: '10%',
  },
});

export const Row = <Row extends GanttRow>({
  row,
  children,
  sidebar: Sidebar,
}: RowProps<Row>) => {
  const {
    setNodeRef,
    setSidebarRef,
    rowWrapperStyle,
    rowStyle,
    rowSidebarStyle,
  } = useRow({ ...row, disabled: true });

  return (
    <RowContext.Provider value={row}>
      <RowWrapper className={RowClasses.root} style={rowWrapperStyle}>
        <Paper
          className={RowClasses.sidebar}
          square
          elevation={0}
          ref={setSidebarRef}
          style={rowSidebarStyle}
        >
          <Sidebar />
        </Paper>
        <Paper
          elevation={0}
          className={RowClasses.content}
          ref={setNodeRef}
          style={rowStyle}
        >
          {children}
        </Paper>
      </RowWrapper>
    </RowContext.Provider>
  );
};
