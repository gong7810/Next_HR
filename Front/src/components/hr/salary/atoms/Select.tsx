import React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { FormControl } from '@mui/material';
import { SelectProps } from '../types/types';

const Select = ({ name, selectonChange }: SelectProps) => {
  return (
    <FormControl style={{ minWidth: '250px' }}>
      <Autocomplete
        disableClearable
        options={name}
        defaultValue={name[0]}
        renderInput={(params) => <TextField {...params} label="" />}
        onChange={selectonChange}
      />
    </FormControl>
  );
};

export default Select;
