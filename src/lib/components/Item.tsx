import type React from 'react';
import { useItem } from 'dnd-timeline';
import { Box, styled } from '@mui/material';
import { GanttItem } from '../types';
import { ItemContext } from '../contexts';

export interface ItemProps<TItem extends GanttItem> {
  children: React.ReactNode;
  item: TItem;
}

const PREFIX = 'Item';
export const ItemClasses = {
  root: `${PREFIX}-Root`,
  content: `${PREFIX}-Content`,
};

const ItemWrapper = styled(Box, {
  name: PREFIX,
  overridesResolver: (_, styles) => styles.root,
})({
  [`&.${ItemClasses.root}`]: {
    flexGrow: 1,
  },
});

export const Item = <TItem extends GanttItem>({
  item,
  children,
}: ItemProps<TItem>) => {
  const { setNodeRef, attributes, listeners, itemStyle, itemContentStyle } =
    useItem({
      id: item.id,
      span: item.span,
      disabled: true,
    });

  return (
    <ItemContext.Provider value={item}>
      <ItemWrapper
        className={ItemClasses.root}
        ref={setNodeRef}
        style={itemStyle}
        {...listeners}
        {...attributes}
      >
        <Box className={ItemClasses.content} style={itemContentStyle}>
          {children}
        </Box>
      </ItemWrapper>
    </ItemContext.Provider>
  );
};
