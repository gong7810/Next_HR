//import Axios from 'axios';
import React, { useState, useEffect, ReactElement } from 'react';
//import { useDispatch } from 'react-redux';
import { MenuItem, Select, FormControl } from '@mui/material';
import MyAppBar from 'components/hr/salary/molecules/MyAppBar';
import Layout from 'layout';
import MyButton from 'components/hr/salary/atoms/MyButton';
import MySocialInsure from 'components/hr/salary/organisms/MySocialInsure';
import Page from 'ui-component/Page';
import { Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';
import { searchInsure } from 'store/slices/hr/salary/Insure';

// SocialInsurePage : 해당 페이지는 {searchYear}정보를 파라미터로 넘겨서 insure에 대한 정보를 얻어서 <MySocialInsure> 컴포넌트에서 사용하는 redux 사용
// ==============================|| TABLE - BASIC ||============================== //

function SocialInsurePage() {
  const [searchYear, setsearchYear] = useState('');
  const [value, setValue] = useState(0);
  const insureChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  const handleChange = (e: any) => {
    setsearchYear(e.target.value);
  };

  //columns, values information
  const labelList = ['건강보험', '국민연금', '고용보험', '산재보험'];

  const healthColums = ['건강보험 부담율', '장기보험 부담율'];
  const healthValues = ['healthinsureRates', 'longtermcareRates'];

  const nationColums = ['국민연금 개인 부담율', '국민연금 사업자 부담율'];
  const nationValues = ['nationpenisionRates', 'teachpenisionRates'];

  const industColumns = ['산재 부담율', '출퇴근재해 요율'];
  const industValues = ['industinsureRates', 'industinsurecharRates'];

  const empColumns = ['고용 보험율', '실업급여 사업자 부담율', '고용안정사업 사업자 부담율', '직업능력개발사업 사업자 부담율'];
  const empValues = ['empinsureRates', 'wrkinsureRates', 'vocacompetencyRates', 'jobstabilRates'];

  return (
    <Page title="사회보험 관리">
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Grid container alignItems="center" justifyContent="flex-end" spacing={2}>
                <Grid item>
                  <FormControl style={{ minWidth: '250px' }}>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" value={searchYear} onChange={handleChange}>
                      <MenuItem value={2022}>2022년</MenuItem>
                      <MenuItem value={2023}>2023년</MenuItem>
                      <MenuItem value={2024}>2024년</MenuItem>
                    </Select>
                  </FormControl>
                  &nbsp;&nbsp;&nbsp;
                  <MyButton
                    variant="contained"
                    color="#5F00FF"
                    onClick={searchInsure(searchYear)}
                    className="button"
                    inputText="조회하기"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <MyAppBar position="static" value={value} onChange={insureChange} label={labelList} />
          {value === 0 && <MySocialInsure insureName={labelList[0]} columns={healthColums} values={healthValues} />}
          {value === 1 && <MySocialInsure insureName={labelList[1]} columns={nationColums} values={nationValues} />}
          {value === 2 && <MySocialInsure insureName={labelList[2]} columns={empColumns} values={empValues} />}
          {value === 3 && <MySocialInsure insureName={labelList[3]} columns={industColumns} values={industValues} />}
        </Grid>
      </Grid>
    </Page>
  );
}

SocialInsurePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default SocialInsurePage;
