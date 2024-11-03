import React from 'react';
import { RowDefinition, useRow } from 'dnd-timeline';

interface RowProps extends Omit<RowDefinition, 'disabled'> {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

const Row = ({ id, children, sidebar }: RowProps) => {
  const {
    setNodeRef,
    setSidebarRef,
    rowWrapperStyle,
    rowStyle,
    rowSidebarStyle,
  } = useRow({ id, disabled: true });

  return (
    <div style={rowWrapperStyle}>
      <div ref={setSidebarRef} style={rowSidebarStyle}>
        {sidebar}
      </div>
      <div ref={setNodeRef} style={rowStyle}>
        {children}
      </div>
    </div>
  );
};

export default Row;
