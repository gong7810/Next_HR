//import { ReactElement } from 'react';

// material-ui
//import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import MyTableBodyRow from './MyTableBodyRow';

// project imports
import React from 'react';
//import { formatNumber } from 'utils/hr/lib';
//import ColumnProps from '../../../../pages/hr/salary/types/types';
import { TableBody } from '@mui/material';
import { MyTableBodyProps } from '../types/types';

const MyTableBody = ({ columns, rowData }: MyTableBodyProps) => {
  return (
    <TableBody>
      <MyTableBodyRow columns={columns} rowData={rowData} />
    </TableBody>
  );
};

export default MyTableBody;
