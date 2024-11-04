import React from 'react';
import { Box, styled } from '@mui/material';

const PREFIX = 'MarkerLabel';

export const MarkerLabelClasses = {
  root: `${PREFIX}-root`,
  day: `${PREFIX}-day`,
  month: `${PREFIX}-month`,
};

export const MarkerLabelWrapper = styled(Box, {
  name: 'MarkerLabel',
  overridesResolver: (_, styles) => styles.root,
})({
  [`&.${MarkerLabelClasses.root}`]: {
    display: 'flex',
    flexDirection: 'column',
  },
  [`& .${MarkerLabelClasses.month}`]: {
    lineHeight: 'normal',
  },
});
