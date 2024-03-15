//import { ReactElement } from 'react';

// material-ui
import { TableCell } from '@mui/material';

// project imports
import React from 'react';
import { MySocialInsureTableCellsProps } from '../types/types';

const MySocialInsureTableCells = ({ align, row, values }: MySocialInsureTableCellsProps) => {
  return (
    <>
      {values.map((value) => (
        <TableCell key={value} align={align}>
          {row[value]} %
        </TableCell>
      ))}
    </>
  );
};

export default MySocialInsureTableCells;
