import React from 'react';
import { Grid } from '@mui/material';
import Select from '../atoms/Select';

// ===========================================================

interface MySelectProps {
  deptName: { label: string; id?: number; value?: string }[];
  empName: { label: string; id?: number; value?: string }[];
  selectHandleChange?: (event: React.SyntheticEvent, value: any) => void;
  selectSearchEmpChange?: (event: React.SyntheticEvent, value: any) => void;
}

const MySelect = ({ deptName, empName, selectHandleChange, selectSearchEmpChange }: MySelectProps) => {
  return (
    <Grid container direction="row" spacing={1}>
      <Grid item>
        <Select name={deptName} selectonChange={selectHandleChange} />
      </Grid>
      <Grid item>
        <Select name={empName} selectonChange={selectSearchEmpChange} />
      </Grid>
    </Grid>
  );
};

export default MySelect;
