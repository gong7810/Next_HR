import React from 'react';
import MyTabs from './MyTabs';
import { AppBar } from '@mui/material';
import { createTheme, ThemeProvider, alpha, getContrastRatio } from '@mui/material/styles';
import { MyAppBarProps } from '../types/types';

//set Color
const violetBase = '#E3C4FF';
const violetMain = alpha(violetBase, 0.3);

const theme = createTheme({
  palette: {
    primary: {
      main: violetMain,
      light: alpha(violetBase, 0.5),
      dark: alpha(violetBase, 0.9),
      contrastText: getContrastRatio(violetMain, '#fff') > 4.5 ? '#fff' : '#111'
    }
  }
});

const MyAppBar = ({ position, value, onChange, label }: MyAppBarProps) => {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position={position}>
        <MyTabs value={value} onChange={onChange} label={label} />
      </AppBar>
    </ThemeProvider>
  );
};

export default MyAppBar;
