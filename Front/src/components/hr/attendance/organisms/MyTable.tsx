import { Table, TableContainer } from '@mui/material';
import MyTableHead from '../molecules/MyTableHead';
import MyTableBody from '../molecules/MyTableBody';
import React from 'react';
import ColumnProps from '../../../../pages/hr/salary/types/types';

// ===========================================================

interface MyTableProps {
  columns: ColumnProps[];
  rowData: any;
  //{ id: string; label: string; minWidth: number; align: string }[];
}

const MyTable = ({ columns, rowData }: MyTableProps) => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 350 }} aria-label="simple table">
        <MyTableHead columns={columns} />
        <MyTableBody columns={columns} rowData={rowData} />
      </Table>
    </TableContainer>
  );
};

export default MyTable;
