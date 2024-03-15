import { Table, TableContainer } from '@mui/material';
import MyTableHead from '../molecules/MyTableHead';
import MyMgtTableBody from '../molecules/MyMgtTableBody';
import React from 'react';
import ColumnProps from '../../../../pages/hr/salary/types/types';

// ===========================================================

interface MyMgtTableProps {
  columns: ColumnProps[];
  rowData: any;
}

const MyMgtTable = ({ columns, rowData }: MyMgtTableProps) => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 350 }} aria-label="simple table">
        <MyTableHead columns={columns} />
        <MyMgtTableBody columns={columns} rowData={rowData} />
      </Table>
    </TableContainer>
  );
};

export default MyMgtTable;
