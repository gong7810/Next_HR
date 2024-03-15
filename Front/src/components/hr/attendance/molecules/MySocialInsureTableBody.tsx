// project imports
import React from 'react';
import { TableBody } from '@mui/material';
import { TableRow } from '@mui/material';
import MySocialInsureTableCells from './MySocialInsureTableCells';
import { useSelector } from 'react-redux';
import { MySocialInsureTableBodyProps } from '../types/types';

const MySocialInsureTableBody = ({ align, values }: MySocialInsureTableBodyProps) => {
  const rowData = useSelector((state: any) => state.Insure.insureList);
  return (
    <TableBody>
      {rowData.map((row: string[], index: number) => (
        <TableRow key={index}>
          <MySocialInsureTableCells align={align} row={row} values={values} />
          {/* <TableCell align="center">{row.nationpenisionRates} %</TableCell>
        <TableCell align="center">{row.teachpenisionRates} %</TableCell> */}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default MySocialInsureTableBody;
