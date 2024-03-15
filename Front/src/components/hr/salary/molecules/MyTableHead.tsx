//import { ReactElement } from 'react';

// material-ui
//import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import MyTableHeadRow from './MyTableHeadRow';

// project imports
import React from 'react';
//import { formatNumber } from 'utils/hr/lib';
//import ColumnProps from '../../../../pages/hr/salary/types/types';
import { TableHead } from '@mui/material';
import { MyTableHeadProps } from '../types/types';


const MyTableHead = ({ columns }: MyTableHeadProps) => {
  return (
    <TableHead sx={{ backgroundColor: '#E8D9FF'}}>
      <MyTableHeadRow columns={columns}/>
    </TableHead>
  );
};

export default MyTableHead;
