import Layout from 'layout';
import React, { ReactElement, useEffect, useState } from 'react';
import Page from 'components/ui-component/Page';
import MainCard from 'ui-component/cards/MainCard';
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { Box } from '@mui/system';

const RestAttendanceRegistPage = () => {
  useEffect(() => {}, []);

  return (
    <Page title="근태외 등록">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <MainCard title="근태외 등록">
            <Box sx={{ minWidth: 60 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">근태구분</InputLabel>
                <Select value="1" label="restTypeName">
                  <MenuItem value={'외출'}>외출</MenuItem>
                  <MenuItem value={'조퇴'}>조퇴</MenuItem>
                  <MenuItem value={'공가'}>공가</MenuItem>
                  <MenuItem value={'병가'}>병가</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </MainCard>
        </Grid>
        {/* <Grid item xs={12} sm={6}>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">신청자</InputLabel>
              <Select label="신청자">123</Select>
            </FormControl>
          </Box>
        </Grid> */}
      </Grid>
    </Page>
  );
};

RestAttendanceRegistPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default RestAttendanceRegistPage;
