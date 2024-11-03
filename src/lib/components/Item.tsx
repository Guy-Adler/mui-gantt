import type React from 'react';
import { useItem, type Span } from 'dnd-timeline';

interface ItemProps {
  id: string;
  span: Span;
  children: React.ReactNode;
}

const Item = ({ id, span, children }: ItemProps) => {
  const { setNodeRef, attributes, listeners, itemStyle, itemContentStyle } =
    useItem({
      id: id,
      span: span,
    });

  return (
    <div ref={setNodeRef} style={itemStyle} {...listeners} {...attributes}>
      <div style={itemContentStyle}>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Item;
