import React from 'react';
import { Tab, Tabs } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MyTabsProps } from '../types/types';

//set Color
const theme = createTheme({
  palette: {
    primary: {
      main: '#7F00FF'
    }
  }
});

const MyTabs = ({ value, onChange, label }: MyTabsProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Tabs value={value} onChange={onChange} aria-label="simple tabs example">
        <Tab label={label[0]} />
        <Tab label={label[1]} />
        <Tab label={label[2]} />
        <Tab label={label[3]} />
      </Tabs>
    </ThemeProvider>
  );
};

export default MyTabs;
