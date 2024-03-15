import React from 'react';
import { Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MyButtonProps from '../types/types';

const MyButton = ({ variant, color, onClick, className, inputText}: MyButtonProps) => {
  //set Color
  const theme = createTheme({
    palette: {
      primary: {
        main: color
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      &nbsp;&nbsp;
      <Button variant={variant} onClick={onClick} className={className}>
        {inputText}
      </Button>
    </ThemeProvider>
  );
};

export default MyButton;
