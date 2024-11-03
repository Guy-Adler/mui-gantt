import React from 'react';
import type { RowDefinition } from 'dnd-timeline';

interface SidebarProps {
  row: RowDefinition;
}

const Sidebar: React.FC<SidebarProps> = ({ row }) => {
  return <div>{`Row ${row.id}`}</div>;
};

export default Sidebar;
