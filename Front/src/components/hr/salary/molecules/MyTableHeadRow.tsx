//import { ReactElement } from 'react';

// material-ui
import { TableCell, TableRow } from '@mui/material';

// project imports
import React from 'react';
//import { formatNumber } from 'utils/hr/lib';
//import ColumnProps from '../../../../pages/hr/salary/types/types';
import { MyTableHeadRowProps } from '../types/types';

const MyTableHeadRow = ({ columns }: MyTableHeadRowProps) => {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          sx={{ py: 3 }}
          key={column.id}
          align={column.align}
          style={{ minWidth: column.minWidth, fontWeight: 'bold', fontSize: 16 }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default MyTableHeadRow;
