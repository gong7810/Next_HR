import React from 'react';
import { TableContainer, Table, TableRow, TableCell, TableHead } from '@mui/material';
import MySocialInsureTableBody from '../molecules/MySocialInsureTableBody';

// ===========================================================

interface MySocialInsureTableProps {
  component: any;
  insureName: string;
  align: 'center' | 'inherit' | 'left' | 'right' | 'justify' | undefined;
  //rowData: any;
  columns: string[];
  values: string[];
}

const MySocialInsureTable = ({ component, insureName, align, columns, values }: MySocialInsureTableProps) => {
  return (
    <TableContainer component={component}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column} align={align} style={{ minWidth: column.minWidth, fontWeight: 'bold', fontSize: 16 }}>
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <MySocialInsureTableBody align={align} values={values} />
        {/* <MySocialInsureTableBody rowData={rowData} align={align} values={values} /> */}
      </Table>
    </TableContainer>
  );
};

export default MySocialInsureTable;
