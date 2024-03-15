// material-ui
import { Grid } from '@mui/material';

// project imports
import BasicGrid from './BasicGrid';
//import ColumnsGrid from './ColumnsGrid';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// ===============================|| GRID SYSTEM||=============================== //

const GridSystem = () => (
  <Grid container spacing={gridSpacing}>
    <Grid item xs={12} md={6}>
      <MainCard title="Basic Grid">
        <BasicGrid />
      </MainCard>
    </Grid>
  </Grid>
);

export default GridSystem;
