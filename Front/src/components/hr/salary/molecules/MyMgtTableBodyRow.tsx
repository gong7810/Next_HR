//import { ReactElement } from 'react';

// material-ui
import { TableCell } from '@mui/material';

// project imports
import React from 'react';
import { formatNumber } from 'utils/hr/lib';
//import ColumnProps from '../../../../pages/hr/salary/types/types';
import { TableRow } from '@mui/material';
import { MyMgtTableBodyRowProps } from '../types/types';

const MyMgtTableBodyRow = ({ columns, rowData }: MyMgtTableBodyRowProps) => {
  return (
    <>
      {rowData.map((rowData: any) => (
        <TableRow key={rowData.position}>
          {columns.map((column) => (
            <TableCell key={column.id} align={column.align}>
              {isNaN(parseFloat(rowData[column.id])) ? rowData[column.id] : formatNumber(parseFloat(rowData[column.id]))}
              {/* {formatNumber(rowData[column.id]) == 'NaN' ? rowData[column.id] : formatNumber(rowData[column.id])} */}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

export default MyMgtTableBodyRow;
