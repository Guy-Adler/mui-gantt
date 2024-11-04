import React from 'react';
import { Paper, Toolbar, Typography } from '@mui/material';
import { CenterNowButton } from './CenterNowButton';

export interface GanttToolbarProps {
  title: React.ReactNode;
}

export const GanttToolbar = ({ title }: GanttToolbarProps) => {
  return (
    <Toolbar component={Paper} elevation={3}>
      <Typography
        variant="h6"
        noWrap
        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
      >
        {title}
      </Typography>
      <CenterNowButton />
    </Toolbar>
  );
};
